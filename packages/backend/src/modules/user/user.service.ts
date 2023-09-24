import { Injectable } from '@nestjs/common';
import { UserAds } from './types';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async listAds(userId: string): Promise<UserAds[]> {
    return this.userRepository.listAds(userId);
  }
}
