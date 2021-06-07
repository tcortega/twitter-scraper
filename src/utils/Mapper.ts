import { ITemporaryMediaObject } from '../typings';

export default class Mapper {
  public constructor() {}

  public static mapMediaObject(mediaObj: any) : ITemporaryMediaObject {
    const mediaUrlList: any = [];

    for (let media of mediaObj) {
      if (media.type == 'video') {
        return Mapper.mapMediaObjectForVideos(media);
      }

      mediaUrlList.push(Mapper.mapMediaObjectForImages(media));
    }

    return <ITemporaryMediaObject>{ isImage: true, media_url: mediaUrlList };
  }

  public static mapMediaObjectForVideos(media: any): ITemporaryMediaObject {
    let validVariants = media.video_info.variants.filter((x: any) => x.hasOwnProperty('bitrate'));

    // Sorting by bitrate ascendingly
    validVariants = validVariants.sort((a: any, b: any) => {
      return b.bitrate - a.bitrate;
    });

    return <ITemporaryMediaObject>{ isVideo: true, media_url: validVariants };
  }

  public static mapMediaObjectForImages(media: any) {
    return {url: media.media_url_https, content_type: "img/jpg" };
  }
}
