import { ITweetData } from '../typings';
import Mapper from './Mapper';
import Request from './Request';

export default class Util {
  public static isValidTweetUrl(tweetUrl: string): boolean {
    return /(?:http)?(?:s:\/\/)?(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)\/status\/[0-9]{19}/.test(tweetUrl);
  }

  public static getTweetId(tweetUrl: string): string {
    return tweetUrl.match(/(?<=status\/\s*)\d+/)![0];
  }

  public static async getRandomGuestID(): Promise<string> {
    const responseData = await (await Request.post('https://api.twitter.com/1.1/guest/activate.json')).json();

    return responseData.guest_token;
  }

  public static filterTweetData(tweetData: any): ITweetData {
    // TO-DO: find a better way to do this.
    let returnObject: ITweetData = {
      id: tweetData.id_str,
      created_at: tweetData.created_at,
      description: tweetData.text ? tweetData.text : tweetData.full_text,
      isMedia: tweetData.hasOwnProperty('extended_entities'),
      favorite_count: tweetData.favorite_count,
      retweet_count: tweetData.retweet_count,
      reply_count: tweetData.reply_count,
      quote_count: tweetData.quote_count,
    };

    if (returnObject.isMedia) {
      returnObject = { ...returnObject, ...Mapper.mapMediaObject(tweetData.extended_entities.media) };
    }

    return returnObject;
  }
}
