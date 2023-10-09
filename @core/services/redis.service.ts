import Redis from 'ioredis';
import { IRedisDAO } from './redis.schema';
import { injectable } from 'inversify';

@injectable()
export class RedisService implements IRedisDAO{
    private readonly client: Redis;

    constructor() {
        this.client = new Redis({
            host: process.env.REDIS_HOST,
            port: +(process.env.REDIS_PORT || 1234)
        })
    }

    async set(key: string, payload: any, ttl ?: number): Promise<void> {
        if(ttl) await this.client.set(key, payload, 'EX', ttl);
        else await this.client.set(key, payload);
    }

    async get(key: string): Promise<any> {
        return await this.client.get(key);
    }

    async delete(key: string): Promise<any> {
        await this.client.del(key);
    }
}