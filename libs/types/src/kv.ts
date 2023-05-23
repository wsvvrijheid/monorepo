// Redis key format: <content>::<shareCount>::<published>
export type RedisPost = `${string}::${number}::${0 | 1}`
export type RedisQuote = RedisPost
