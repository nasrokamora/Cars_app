import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RefreshTokenService {
  private readonly SALT_ROUNDS = 10;

  constructor(private readonly prisma: PrismaService) {}

  //نقوم بانشاء refresh token جديد فل DB

  async create(
    userId: string,
    refreshToken: string,
    expiresAt: Date,
    ip?: string,
    userAgent?: string,
  ) {
    //نقوم بانشاء تشفير لل refresh token بستخدام bcrypt
    const tokenHash = await bcrypt.hash(refreshToken, this.SALT_ROUNDS);
    return this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
        ip,
        userAgent,
      },
    });
  }
  //نتحقق من وجود refresh token في DB function

  async validate(userId: string, refreshToken: string): Promise<boolean> {
    const tokens = await this.prisma.refreshToken.findMany({
      where: {
        userId,
        revokedAt: null,
        expiresAt: { gte: new Date() }, // صالح إلى الآن
      },
    });
    for (const token of tokens) {
      const isValid = await bcrypt.compare(refreshToken, token.tokenHash);
      if (isValid) return true;
    }
    return false;
  }

  // ابطال جميع tokens (logout)
  async revokedAll(userId: string) {
    await this.prisma.refreshToken.updateMany({
      where: {
        userId: userId,
        revokedAt: null,
      },
      data: { revokedAt: new Date() },
    });
  }
  // إبطال توكن واحد (مثلاً لو استخدم جهاز واحد logout)

  async revokedById(id: string) {
    await this.prisma.refreshToken.update({
      where: { id },
      data: { revokedAt: new Date() },
    });
  }
}
