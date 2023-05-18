// Redis key format: <postId>::<content>::<shareCount>
export type RedisPost = `${number}::${string}::${number}`
export type RedisQuote = RedisPost
