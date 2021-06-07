import TwitterScraper from '../src/libs/TwitterScraper';
import { ITweetData } from '../src/typings';

describe('TwitterScraper.ts', () => {
  let twtScraper: TwitterScraper;
  let videoMeta: ITweetData;
  let imageMeta: ITweetData;
  let noMediaMeta: ITweetData;

  beforeAll(async () => {
    twtScraper = await TwitterScraper.create();
  });

  it('Should be able to recover metadata from a tweet url containing a video.', async () => {
    videoMeta = await twtScraper.getTweetMeta('https://twitter.com/Twitter/status/1319006269785755648');
    expect(videoMeta.id).toBe('1319006269785755648');
    expect(videoMeta.media_url![0].url).toBe('https://video.twimg.com/amplify_video/1319006218141245442/vid/960x720/ZsxP64rNZaf3gt9-.mp4?tag=13');
  });

  it('Should be able to recover metadata from a tweet url containing images.', async () => {
    imageMeta = await twtScraper.getTweetMeta('https://twitter.com/Twitter/status/1293239745695211520');
    expect(imageMeta.id).toBe('1293239745695211520');
    expect(imageMeta.media_url![0].url).toBe('https://pbs.twimg.com/media/EfJ-C-JU0AAQL_C.jpg');
  });

  it('Should be able to recover metadata from a tweet url with no media.', async () => {
    noMediaMeta = await twtScraper.getTweetMeta('https://twitter.com/Twitter/status/1334542969530183683');
    expect(noMediaMeta.id).toBe('1334542969530183683');
    expect(noMediaMeta.media_url).toBe(undefined);
    expect(noMediaMeta.description).not.toBe(undefined);
    expect(noMediaMeta.description!.length).not.toBe(0);
  });
});
