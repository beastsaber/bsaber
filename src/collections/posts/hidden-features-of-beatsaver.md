---
title: Uncovering Hidden Features of BeatSaver
section: articles
category: guide
publish: 2024-06-01T00:00:00.000Z
homepageText: Not all BeatSaver features are apparent at first sight. This
  article reveals hidden aspects of the BeatSaver platform such as tag
  filtering, multi-tag selection, multi-adding to bookmarks, direct map search
  via keys, double upload prevention, review curations, and displaying bot maps.
image: /static/uploads/posts/hidden-features-of-beatsaver/uncovering-beatsaber-features-cover.png
authors:
  - '139574'
showInPostListing: true
credits:
  - contribution: adding to this list and providing feedback on the article
    contributors:
      - '57657'
  - contribution: proofreading and reviewing the article
    contributors:
      - '4285984'
---

[BeatSaver](https://beatsaver.com) is the place to get and distribute maps. If you are using a custom song mod, it is more than likely retrieving the maps from there. Some of BeatSaver's features can be a bit hidden, undocumented, or only become apparent in specific cases.

The following features are from the view of "normal users" and will thus go into aspects that are relevant when you are simply using the website to view and find maps or upload your own maps.

# Excluding Tags

By opening the filter dropdown you gain the ability to filter by tags. For example, if you are into Tech maps, you can search for Tech maps specifically.

![](/uploads/posts/hidden-features-of-beatsaver/uncovering-beatsaber-features-1.png)

At first glance, it appears to only allow for positive filtering; meaning you can only declare "I want to only be shown maps that have the XYZ tag".

But what if you are having a lazy day and want to avoid Fitbeat maps? Just press the <kbd>Alt</kbd> button while clicking the tag that you want to exclude. You will find that the tag turns red, and maps with such a tag will no longer appear in your search!

![](/uploads/posts/hidden-features-of-beatsaver/uncovering-beatsaber-features-2.png)

# Selecting Multiple Tags

When playing with the tag filters, you will notice that you can only select one of the blue tags and one of the green tags. Selecting another of the same category will result in the previous selection being deleted. However, it is possible to select multiple tags by pressing <kbd>Shift</kbd> while clicking the additional tags.

![](/uploads/posts/hidden-features-of-beatsaver/uncovering-beatsaber-features-3.png)

The results from the image above will now show you maps that either have the "Fitness" or "Tech" or both tags. If you were trying to find maps that are techy Fitbeat maps you cannot find them this way though.

You can do the same with the tag exclusions by pressing <kbd>Shift</kbd> + <kbd>Alt</kbd> together while clicking the tags. Other than the positive filters, it will be interpreted as "Neither X, Y, nor Z, nor any combination of these".

![](/uploads/posts/hidden-features-of-beatsaver/uncovering-beatsaber-features-4.png)

# Multi-Adding to Bookmarks

On playlists you have a useful "Multi-Add" button that you can use to add multiple maps by their key or hash.

![](/uploads/posts/hidden-features-of-beatsaver/uncovering-beatsaber-features-5.png)

When it comes to your bookmarks, you will not find buttons like that.

![](/uploads/posts/hidden-features-of-beatsaver/uncovering-beatsaber-features-6.png)

Do not let that fool you! Just add a `/add` to the end of your bookmark URL and you can still multi-add! For example, if I wanted to do this to my bookmarks, I would end up with: `https://beatsaver.com/playlists/97886/add` (your URL will have a different playlist ID in the URL so this link will not work for you).

You can also add `/edit` to the URL, but this will not do a lot for you since the API will not allow you to save edits to the bookmarks playlist.

# "key:" and "mapper:" Keywords in the Search

If you know the key of a map, you can navigate to the map page directly by typing `key:{your map key}` in the search bar and then clicking "Search".

![](/uploads/posts/hidden-features-of-beatsaver/uncovering-beatsaber-features-7.png)

Similarly, you can use the `mapper:{mapper name}` keyword to reduce the results to those of a mapper.

![](/uploads/posts/hidden-features-of-beatsaver/uncovering-beatsaber-features-11.png)

Using the `mapper:` keyword will only show maps uploaded by the mapper and not collaborations. This can allow you to search maps of a given mapper with the known filters and search terms.

The `mapper:` keyword can also be used multiple times allowing to, for example, search across alt accounts too.

![](/uploads/posts/hidden-features-of-beatsaver/uncovering-beatsaber-features-12.png)

# Finding a Map by its Hash

If you only have the hash of a map you can find the map by putting the hash in the search bar and clicking "Search". This will open the respective map's page similar to `key:` keyword.

![](/uploads/posts/hidden-features-of-beatsaver/uncovering-beatsaber-features-13.png)

# No Double Upload

When you try to upload a map that has already been uploaded, it will not allow you to do so and will tell you that the map has already been uploaded. This is checked via the map hash. The upload will also generally verify that your map file is valid and will work in-game.

![](/uploads/posts/hidden-features-of-beatsaver/uncovering-beatsaber-features-8.png)

# Review Curations

You may be aware that maps can be curated by our curators. However, Reviews can also be curated. This is sometimes also being referred to as being "featured". Curators and Admins can click a button to feature a given review. The review will then be shown above all uncurated reviews and have a green border. There is, however, no notification that you review has been curated.

![](/uploads/posts/hidden-features-of-beatsaver/uncovering-beatsaber-features-9.png)

# Showing Bot Maps

If you ever wondered where all the bot maps are that people talk about, then you may not be aware of the fact that BeatSaver, by default, hides bot maps. If you want to see bot maps as well, you will need to enable that in the filters!

![](/uploads/posts/hidden-features-of-beatsaver/uncovering-beatsaber-features-10.png)

# Any More Features

These are the hidden features that I have learned about over the last year. Did I miss anything? Do let us know on the [BeastSaber Discord](https://discord.gg/5VaEjFeuny)!
