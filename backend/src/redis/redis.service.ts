import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  // 레디스를 전역으로 관리 및 각각의 서비스에서 관리 하기 위해 사용된다.
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  // RefreshToken 1일 저장
  async saveRefreshToken(userId: string, refreshToken: string) {
    await this.cache.set(`refresh:${userId}`, refreshToken, 60 * 60 * 24);
  }

  // RefreshToken 조회
  async getRefreshToken(userId: string) {
    return await this.cache.get<string>(`refresh:${userId}`);
  }

  // RefreshToken 삭제
  async deleteRefreshToken(userId: string) {
    return await this.cache.del(`refresh:${userId}`);
  }

  // 채팅 저장 1시간
  async saveChatMessage(roomId: string, message: string) {
    const redisKey = `chat:${roomId}`;
    const messages = (await this.cache.get<string[]>(redisKey)) || [];
    messages.push(message);
    if(messages.length > 100) {
        messages.shift();
    }
    await this.cache.set(`chat:${roomId}`, message, 60 * 60);
  }
  // 채팅 조회 최근 100개
  async getChatMessage(roomId: string) {
    const redisKey = `chat:${roomId}`;
    const messages = (await this.cache.get<string[]>(redisKey)) || [];
    // 100개 만 가져오기
    if (!messages) {
      return [];
    }
    return messages.slice(-100);
  }
  // 채팅 삭제
  async deleteChatMessage(roomId: string) {
    return await this.cache.del(`chat:${roomId}`);
  }
}
