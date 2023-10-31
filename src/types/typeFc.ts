export type ToRecord<T, K = unknown> = Record<keyof T, K>

export type Nullable<T> = T | null

export type NullableObj<T> = {
  [K in keyof T]: Nullable<T[K]>
}

export type Merge<T, U> = {
  [P in keyof (T & U)]: P extends keyof T
    ? P extends keyof U
      ? T[P] & U[P]
      : T[P]
    : P extends keyof U
    ? U[P]
    : never
}

export type DeepMerge<T, U> = {
  [P in keyof (T & U)]: P extends keyof U
    ? P extends keyof T
      ? U[P] extends object
        ? T[P] extends object
          ? DeepMerge<T[P], U[P]>
          : U[P]
        : U[P]
      : U[P]
    : P extends keyof T
    ? T[P]
    : never
}

export type MergeAll<T extends any[]> = T extends [infer U, ...infer R]
  ? R extends []
    ? U
    : DeepMerge<U, MergeAll<R>>
  : never
