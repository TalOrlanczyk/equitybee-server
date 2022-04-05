import {createClient, RedisClientType} from 'redis';
import {promisify} from 'util';

export  enum RedisKey {
    DOMAIN = "domain",
}

interface RedisExt extends RedisClientType {
  getAsync(key: string): Promise<string | null>;
  setAsync(key: string, value: string): Promise<'OK' | null>;
}

const client = createClient() as RedisExt;
client.getAsync = promisify((client as any).get).bind(client);
client.setAsync = promisify((client as any).set).bind(client);

client.on('error', function (error) {
  console.error(`Redis error: ${error}`);
});
client.on('connect', function () {
  console.log(`Redis connected`);
});

client.on('ready', function () {
  console.log(`Redis ready`);
});

client.on('end', function (err) {
  console.log(`Redis connection closed: ${err}`);
});

export const redisConnect = async () => {
  await client.connect();
  client.flushAll();
};

export const getOrSetCache =async (
  key: string,
  cb: () => any,
  ttl: number = 3600,
) => {
    const value = await client.get(key);
    if (value != null){
        console.log("hi");

         return JSON.parse(value)};
    const freshData = await cb();

    client.setEx(key, ttl, JSON.stringify(freshData));
     return freshData
};
export const deleteHandler =async (
  key: string,

) => {
    const value = await client.del(key);

};
export default client;
