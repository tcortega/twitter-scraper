export interface ITweetData {
  id: string;
  created_at: string;
  description?: string;
  isMedia: boolean;
  favorite_count: number;
  retweet_count: number;
  reply_count: number;
  quote_count: number;
  isVideo?: boolean;
  isImage?: boolean;
  media_url?: ITweetMediaMetaData[];
}

export interface ITemporaryMediaObject {
  isVideo?: boolean;
  isImage?: boolean;
  media_url?: ITweetMediaMetaData[];
}

export interface ITweetMediaMetaData {
  url: string;
  content_type: string;
  bitrate?: number;
}
