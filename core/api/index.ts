import type { NextApiRequest, NextApiResponse } from 'next'

export interface BaseResponse {
  /**
   * @remark
   *
   * This message should always appended to the response.
   */
  message: string | object
}

export type BaseError = Omit<Error, 'message'>

export type RequestPayload<Payload = undefined> = NextApiRequest & {
  body: Payload
}

export type RequestPayloadOptional = NextApiRequest

export type RequestResponse<
  D,
  E extends BaseError = BaseError
> = NextApiResponse<BaseResponse & { data?: D; error?: E }>
