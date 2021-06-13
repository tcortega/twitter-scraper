# Twitter Scraper & Downloader

Scrape and download useful information from Twitter.

## No login or password are required

This is not an official API support. This is just a scraper which uses Twitter's web API to scrape media and related meta information.

---
## Content
- [Features](#features)
- [To Do](#to-do)
- [Contribution](#contribution)
- [Installation](#installation)
- [Usage](#usage)
	- [Module](#module)
	    - [Methods](#methods)
	    - [Use with Promises](#promise)
	    - [Output Example](#json-output-example)
	        - [Tweet Feed Methods](#tweet-feed)
## Features

- Scrape metadata from any tweet, including video & image urls.

## To Do
-   [ ] Add support to scrape user-specific metadata.
-   [ ] Improve documentation

## Contribution

-   Don't forget about tests

```sh
yarn test
```

```sh
yarn build
```
## Installation

twitter-scraper requires [Node.js](https://nodejs.org/) v10+ to run.

**Install from NPM**

```sh
npm i -g @tcortega/twitter-scraper
```

**Install from YARN**

```sh
yarn global add @tcortega/twitter-scraper
```

## USAGE

## Module

### Methods

```javascript
.getTweetMeta(tweetUrl) // Scrape tweet metadata from a specific tweet (Promise).
```

## Promise
```javascript
const { TwitterScraper } = require("@tcortega/twitter-scraper");

// Tweet Metadata by tweet url.
(async () => {
  try {
    const twtScraper = await TwitterScraper.create();
    const tweetMeta = await twtScraper.getTweetMeta("https://twitter.com/Twitter/status/1390396166496522247");
    console.log(tweetMeta);
  } catch (error) {
    console.log(error);
  }
})();
```

### Json Output Example

#### Tweet Feed
Example output for the methods: **getTweetMeta**
```javascript
// Note that everything inside media_url is usually sorted by the bitrate descendingly
{
  id: '1379101721343975426',
  created_at: 'Mon Apr 05 16:00:47 +0000 2021',
  description: 'Hey #DisabilityTwitter, thank you so much for your feedback about captioning our videos. We hear you, we see you, we’ve added captions to this @TwitterSpaces announcement. What do you think? We’ll continue to level up our captioning process moving forward. #UntilWeAllBelong https://t.co/E3EK7MZmgR',
  isMedia: true,
  favorite_count: 2759,
  retweet_count: 489,
  reply_count: 1188,
  quote_count: 111,
  isVideo: true,
  media_url: [
    {
      bitrate: 2176000,
      content_type: 'video/mp4',
      url: 'https://video.twimg.com/ext_tw_video/1379100778439270410/pu/vid/1280x720/iUvXD6H13QiZF7mp.mp4?tag=12'
    },
    {
      bitrate: 832000,
      content_type: 'video/mp4',
      url: 'https://video.twimg.com/ext_tw_video/1379100778439270410/pu/vid/640x360/ilHR1Y8Zl6yRIXOi.mp4?tag=12'
    },
    {
      bitrate: 256000,
      content_type: 'video/mp4',
      url: 'https://video.twimg.com/ext_tw_video/1379100778439270410/pu/vid/480x270/KFG8GZ4tSTtjwwuk.mp4?tag=12'
    }
  ]
}
```