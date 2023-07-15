/**
 * @description 响应状态码
 */
export enum ResponseStatusCode {
  // 成功响应
  SUCCESS = 200,
  CREATED = 201,
  // 客户端错误
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  GATEWAY_TIMEOUT = 504
}

/**
 * @description 响应状态码对应的错误信息
 */
export const errorMessageMap = new Map<ResponseStatusCode, string>([
  [ResponseStatusCode.BAD_REQUEST, '400: Bad Request!'],
  [ResponseStatusCode.UNAUTHORIZED, '401: Unauthorized!'],
  [ResponseStatusCode.FORBIDDEN, '403: Forbidden!'],
  [ResponseStatusCode.NOT_FOUND, '404: NotFound!'],
  [ResponseStatusCode.METHOD_NOT_ALLOWED, '405: Method Not Allowed!'],
  [ResponseStatusCode.CONFLICT, '409: Conflict!'],
  [ResponseStatusCode.TOO_MANY_REQUESTS, '429: Too Many Requests!'],
  [ResponseStatusCode.INTERNAL_SERVER_ERROR, '500: Internal Server Error!'],
  [ResponseStatusCode.BAD_GATEWAY, '502: Bad Gateway!'],
  [ResponseStatusCode.GATEWAY_TIMEOUT, '504: Gateway Timeout!']
])
