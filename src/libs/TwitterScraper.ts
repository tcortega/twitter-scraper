import { Util } from '../utils/Util';
import { Request } from '../utils/Request';
import { TwitterScraperError } from '../errors/TwitterScraperError';
import { ErrorEnum } from '../enums/ErrorEnum';
import { ITweetData } from '../typings';

export class TwitterScraper {
  constructor(private guestId: string) {}

  public static async create(): Promise<TwitterScraper> {
    const guestId = await Util.getRandomGuestID();
    return new TwitterScraper(guestId);
  }

  public async getTweetMeta(tweetUrl: string): Promise<ITweetData> {
    if (Util.isValidTweetUrl(tweetUrl)) {
      const tweetId = Util.getTweetId(tweetUrl);
      const res = await Request.get(
        `https://twitter.com/i/api/2/timeline/conversation/${tweetId}.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&send_error_codes=true&simple_quoted_tweet=true&count=20&include_ext_has_birdwatch_notes=false&ext=mediaStats%2ChighlightedLabel`,
        this.buildGuestIdHeader()
      );

      if (res.status === 401) {
        this.reloadGuestId();
        return this.getTweetMeta(tweetUrl);
      }

      const resJson = await res.json();

      const tweetData = resJson.globalObjects.tweets[tweetId];

      return Util.filterTweetData(tweetData);
    }

    throw new TwitterScraperError(ErrorEnum.INVALID_URL, 'INVALID_URL');
  }

  public async reloadGuestId() {
    this.guestId = await Util.getRandomGuestID();
  }

  private buildGuestIdHeader(): object {
    return { 'x-guest-token': this.guestId };
  }
}
