#!/bin/bash

for file in ./src/collections/map-of-the-week/*.md; do

  # Change filename to zeroed time
  new_filename="$(echo "$file" | sed -E 's/([0-9]{4}-[0-9]{2}-[0-9]{2})T[0-9:]{8}\.[0-9]{3}Z/\1T00:00:00.000Z/')"
  mv "$file" "$new_filename"

  datetime_for_startdate=$(basename "${new_filename%.md}")

  # Change startDate to filename timestamp
  yq eval --inplace --front-matter=process ".startDate = \"$datetime_for_startdate\"" "$new_filename"
done
