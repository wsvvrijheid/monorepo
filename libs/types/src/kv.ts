// Redis key format: <postId>::<content>::<shareCount>
export type RedisPost = `${string}::${number}`
export type RedisQuote = RedisPost
