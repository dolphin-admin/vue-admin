/**
 * @description 响应状态码
 */
export enum ResponseStatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

/**
 * @description 响应状态码对应的错误信息
 */
export const errorMessageMap = new Map<ResponseStatusCode, string>([
  [ResponseStatusCode.BAD_REQUEST, '400: Bad Request!'],
  [ResponseStatusCode.UNAUTHORIZED, '401: Unauthorized!'],
  [ResponseStatusCode.FORBIDDEN, '403: Forbidden!'],
  [ResponseStatusCode.NOT_FOUND, '404: NotFound!'],
  [ResponseStatusCode.CONFLICT, '409: Conflict!'],
  [ResponseStatusCode.INTERNAL_SERVER_ERROR, '500: Internal Server Error!']
])
