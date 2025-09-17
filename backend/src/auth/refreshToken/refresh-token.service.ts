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
    jti?: string,
  ) {
    //نقوم بانشاء تشفير لل refresh token بستخدام bcrypt
    const tokenHash = await bcrypt.hash(refreshToken, this.SALT_ROUNDS);
    const jtiValue = jti ?? 'default-jti-value'; // تعيين قيمة افتراضية إذا كانت jti غير معرفة
    return await this.prisma.refreshToken.create({
      data: {
        userId,
        jti: jtiValue,
        tokenHash,
        expiresAt,
        ip,
        userAgent,
      },
    });
  }

  async findByJti(jti: string) {
    return await this.prisma.refreshToken.findUnique({
      where: {
        jti,
      },
    });
  }

  async revokeByJti(jti: string, userId: string, replacedBy?: string) {
    return await this.prisma.refreshToken.updateMany({
      where: { jti, userId, revokedAt: null },
      data: { revokedAt: new Date(), replacedBy },
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
        userId,
        revokedAt: null,
      },
      data: { revokedAt: new Date() },
    });
  }
  // إبطال توكن واحد (مثلاً لو استخدم جهاز واحد logout)

  async revokedById(userId: string, refreshToken: string) {
    const token = await this.prisma.refreshToken.findMany({
      where: { userId, revokedAt: null },
    });
    for (const t of token) {
      const isMAtch = await bcrypt.compare(refreshToken, t.tokenHash);
      if (isMAtch) {
        await this.prisma.refreshToken.update({
          where: { id: t.id },
          data: { revokedAt: new Date() },
        });
        break; //break to stop loop
      }
    }
  }

  //   await this.prisma.refreshToken.updateMany({
  //     where: { userId, tokenHash: refreshToken, revokedAt: null },
  //     data: { revokedAt: new Date() },
  //   });
  // }
}
