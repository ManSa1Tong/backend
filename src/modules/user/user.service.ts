import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { GetUserInfoDto } from './dto/get-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async checkNicknameAvailability(nickname: string): Promise<boolean> {
    const existingUser = await this.prisma.user.findUnique({
      where: { nickname },
    });

    // 닉네임이 이미 존재하면 false 반환
    return !existingUser;
  }

  async checkEmailAvailability(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? false : true; // 이메일이 이미 존재하면 false 반환
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updatePasswordByEmail(
    email: string,
    newPassword: string,
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
  }

  async fetchUserByUserId({
    userId,
  }: {
    userId: string;
  }): Promise<GetUserInfoDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      throw new NotFoundException('존재하지 않는 회원입니다.');
    }

    return plainToInstance(GetUserInfoDto, user);
  }
}
