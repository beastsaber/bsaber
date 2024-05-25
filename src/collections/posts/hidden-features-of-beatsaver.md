---
title: Uncovering Hidden Features of BeatSaver
section: articles
category: guide
publish: 2024-05-25T00:00:00.000Z
homepageText: Not all BeatSaver features are apparent at first sight. This
  article reveals hidden aspects of the BeatSaver platform such as tag
  filtering, multi-tag selection, multi-adding to bookmarks, direct map search
  via keys, double upload prevention, review curations, and displaying bot maps.
image: /static/uploads/posts/uncovering-beatsaber-features-cover.png
authors:
  - '139574'
showInPostListing: true
linkToSpecialtyPage: /getting-started
---

[BeatSaver](https://beatsaver.com) is the place to get and distribute maps. If you are using a custom song mod it is more than likely that it retrieves from there. Some of BeatSaver's features can be a bit hidden or undocumented or only become apparent in specific cases.

The following features are from the view of "normal users" and will thus go into aspects that are relevant when you are simply using the website to view and find maps or upload your own maps.

# Excluding Tags

By opening the filter dropdown you gain the ability to filter for tags. For example, if you are into Tech maps, you can search for Tech maps specifically.

![](/uploads/posts/uncovering-beatsaber-features-1.png)

At first glance, it appears to only allow for positive filtering; meaning you can only declare "I want to only be shown maps that have the XYZ tag".

But what if you are having a lazy day and want to avoid Fitbeat maps? Just press the `[Alt]` button while clicking the tag that you want to exclude. You will find that the tag turns red, and maps with such a tag will no longer appear in your search!

![](/uploads/posts/uncovering-beatsaber-features-2.png)

# Selecting Multiple Tags

When playing with the tag filters, you will notice that you can only select one of the blue tags and one of the green tags. Selecting another of the same category will result in the previous selection being deleted. However, it is possible to select multiple tags by pressing `[Shift]` while clicking the additional tags.

![](/uploads/posts/uncovering-beatsaber-features-3.png)

The results from the image above will now show you maps that either have the "Fitness" or "Tech" or both tags. If you were trying to find maps that are techy Fitbeat maps you cannot find them this way though.

However, you can combine it with the tag exclusion feature and find your techy Fitbeat maps by excluding every tag that is not "Tech" and "Fitness" by pressing `[Shift]` and `[Alt]` together while clicking the tags.

![](/uploads/posts/uncovering-beatsaber-features-4.png)

This works because multiple negative filters will - other than the positive filters - result in being interpreted as "Neither X, Y, nor Z or any combination of those".

# Multi-Adding to Bookmarks

On playlists you have a useful "Multi-Add" button that you can use to add multiple maps by their key or hash.

![](/uploads/posts/uncovering-beatsaber-features-5.png)

When it comes to your bookmarks, you will not find buttons like that.

![](/uploads/posts/uncovering-beatsaber-features-6.png)

Do not let that fool you! Just add a `/add` to the end of your bookmark URL and you can still multi-add! For example, `https://beatsaver.com/playlists/97886/add` (this link will not work for you though).

You can also add `/edit` to the URL, but this will not do a lot for you since the API will not allow editing the playlist.

# "key:" and "mapper:" Keyword in the Search

If you know the key of a map, you can navigate to the map page directly by typing `key:{your map key}` in the search bar and then clicking "Search".

![](/uploads/posts/uncovering-beatsaber-features-7.png)

Similarly, you can use the `mapper:{mapper name}` keyword to reduce the results to those of a mapper.

![](/uploads/posts/uncovering-beatsaber-features-11.png)

Using the `mapper:` keyword will only show maps uploaded by the mapper and not collaborations. This can you allow to search maps of a given mapper with the the filters and search terms.

The `mapper:` keyword can also be used multiple times allowing to, for example, search across alt accounts too.

![](/uploads/posts/uncovering-beatsaber-features-12.png)


# Finding a Map by it's Hash

If you only have the hash of a map you can find the map by putting the hash in the search bar and clicking "Search". This will open the respective map's page similar to `key:` keyword.

![](/uploads/posts/uncovering-beatsaber-features-13.png)


# No Double Upload

When you try to upload a map that has already been uploaded it will not allow you to do so and tell you that the Map has already been uploaded. This is checked via the map hash. The upload will also generally verify, that your map file is valid and will work in-game.

![](/uploads/posts/uncovering-beatsaber-features-8.png)

# Review Curations

You may be aware that maps can be curated by our curators. However, Reviews can also be curated. This is sometimes also being referred to as being "featured". Curators and Admins can click a button to feature a given review. The review will then be shown above all uncurated reviews and have a green border. There is by the way no notification for getting your review curated.

![](/uploads/posts/uncovering-beatsaber-features-9.png)

# Showing Bot Maps

If you ever wondered where all the bot maps are that people talk about, then you may not be aware of the fact, that BeatSaver - by default - hides bot maps. If you want to see bot maps as well, you will need to enable that in the filters!

![](/uploads/posts/uncovering-beatsaber-features-10.png)

# Any More Features

These are the hidden features that I have learned about over the last year. Did I miss anything? Do let us know on the [BeastSaber Discord](https://discord.gg/VJZHUbt)!
