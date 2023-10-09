export interface IRedisDAO {
  set: (key: string, payload: any, ttl?: number | null) => Promise<any>;
  get: (key: string) => Promise<any>;
  delete: (key: string) => Promise<any>;
}
