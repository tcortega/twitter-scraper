import { TwitterScraper } from '../src/libs/TwitterScraper';
import { ITweetData } from '../src/typings';

describe('TwitterScraper.ts', () => {
  let twtScraper: TwitterScraper;
  let videoMeta: ITweetData;

  beforeAll(async () => {
    twtScraper = await TwitterScraper.create();
  });

  it('Should be able to recover metadata from a tweet url containing a video.', async () => {
    videoMeta = await twtScraper.getTweetMeta('https://twitter.com/Twitter/status/1319006269785755648');
    expect(videoMeta.id).toBe('1319006269785755648');
    expect(videoMeta.media_url![0].url).toBe('https://video.twimg.com/amplify_video/1319006218141245442/vid/960x720/ZsxP64rNZaf3gt9-.mp4?tag=13');
  });
});
