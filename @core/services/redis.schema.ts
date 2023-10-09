export interface IRedisDAO {
    set(key: string, payload: any, ttl ?: number)
    get(key: string)
    delete(key: string)
}