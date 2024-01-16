export enum ApiMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum HttpStatusCode {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  MovedPermanently = 301,
  NotModified = 304,

  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,

  InternalServerError = 500,
  ServiceUnavailable = 503,
}

export enum CategoryCode {
  TRANSCRIBING_BUDDHA_NAME = "TRANSCRIBING_BUDDHA_NAME",
  TRANSCRIBING_MANTRA = "TRANSCRIBING_MANTRA",
  TRANSCRIBING_SUTRA = "TRANSCRIBING_SUTRA",
}

export enum TopicAchievement {
  SEVEN = 7,
  TWENTY_ONE = 21,
  FORTY_NINE = 49,
  ONE_HUNDRED_EIGHT = 108,
}

export const TOPIC_COUNT_DEFAULT = 1;