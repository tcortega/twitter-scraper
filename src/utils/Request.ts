import fetch, { Response } from 'node-fetch';

export class Request {
  static defaultHeaders = { authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA' };

  public static async get(url: string, customHeaders?: Object): Promise<Response> {
    let requestHeaders = this.defaultHeaders;
    if (customHeaders) requestHeaders = { ...this.defaultHeaders, ...customHeaders };

    return await fetch(url, {
      headers: requestHeaders,
    });
  }

  public static async post(url: string, customHeaders?: Object): Promise<Response> {
    let requestHeaders = this.defaultHeaders;
    if (customHeaders) requestHeaders = { ...this.defaultHeaders, ...customHeaders };

    return await fetch(url, {
      method: 'POST',
      headers: requestHeaders,
    });
  }
}
