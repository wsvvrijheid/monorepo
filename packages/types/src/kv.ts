// Redis key format: <content>::<postId>::<shareCount>::<published>
export type RedisPost = `${string}::${number}::${number}::${0 | 1}`

// Redis key format: <content>::<shareCount>
export type RedisQuote = `${string}::${number}`
