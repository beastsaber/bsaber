#!/bin/bash

## Note:
## Requires yq, jq, and curl to be installed


for file in ./src/collections/map-of-the-week/*.md; do
    
    # Extract mapId, removing any trailing \n--- that might be present
    mapId=$(yq e --front-matter=process '.mapId' "$file" | tr -d '\n' | sed 's/---$//')
    coverUrlOverwriteExists=$(yq e --front-matter=process 'has("coverUrlOverwrite")' "$file" | tr -d '\n' | sed 's/---$//')
    coverUrlOverwriteIsNull=$(yq e --front-matter=process '.coverUrlOverwrite == null' "$file" | tr -d '\n' | sed 's/---$//')

    echo "Processing mapId: $mapId"

    if [[ "$mapId" != "null" && ( "$coverUrlOverwriteExists" == "false" || "$coverUrlOverwriteIsNull" == "true" ) ]]; then
        echo "Updating coverUrlOverwrite for mapId ${mapId}..."
        response=$(curl -s --max-time 30 "https://api.beatleader.xyz/leaderboard/${mapId}")

        if [ -z "$response" ]; then
            echo "Error: No response for mapId ${mapId}, skipping..."
            continue
        fi

        # use .song.coverImage as a fallback if .song.fullCoverImage is not available
        coverUrl=$(echo "$response" | jq -r '.song.fullCoverImage // .song.coverImage')

        if [ -z "$coverUrl" ] || [ "$coverUrl" == "null" ]; then
            echo "No cover URL found for mapId ${mapId}, skipping..."
            continue
        fi

        # update coverUrlOverwrite in the YAML front matter using yq
        yq e --inplace --front-matter=process ".coverUrlOverwrite = \"$coverUrl\"" "$file"

        # sleeping to ensure to not hit the rate limit of the BeatLeader API (10 requests per 10 seconds)
        sleep 1

        echo "Done updating coverUrlOverwrite for mapId ${mapId}..."
    else
        echo "mapId ${mapId} already has a coverUrlOverwrite - skipped."
    fi

done
