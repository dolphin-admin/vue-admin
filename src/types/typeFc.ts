export type ToRecord<T, K = unknown> = Record<keyof T, K>

export type Nullable<T> = T | null

export type NullableObj<T> = {
  [K in keyof T]: Nullable<T[K]>
}
