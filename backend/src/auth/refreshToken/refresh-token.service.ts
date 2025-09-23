import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';

@Injectable()
export class RefreshTokenService {
  private readonly SALT_ROUNDS = 10;

  constructor(private readonly prisma: PrismaService) {}

  private hmacFingerprint(token: string) {
    const secret = process.env.HMAC_SECRET || 'default';
    if (!secret) throw new Error('HMAC_SECRET is not defined');
    return crypto.createHmac('sha256', secret).update(token).digest('hex');
  }

  //نقوم بانشاء refresh token جديد فل DB

  async create(params: {
    userId: string;
    refreshToken: string;
    jwtId: string;
    expiresAt: Date;
    ip?: string;
    userAgent?: string;
  }) {
    const { userId, refreshToken, jwtId, expiresAt, ip, userAgent } = params;

    //قابل للفهرسة
    const fingerprint = this.hmacFingerprint(refreshToken);

    //hash قوي (argon2) لحماية fingerprint في حال تسرب DB
    const tokenHash = await argon2.hash(fingerprint);

    //نقوم بانشاء تشفير لل refresh token بستخدام bcrypt
    // const tokenHash = await bcrypt.hash(refreshToken, this.SALT_ROUNDS);
    // const jtiValue = jti ?? 'default-jti-value'; // تعيين قيمة افتراضية إذا كانت jti غير معرفة
    return await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        jti: fingerprint,
        jwtId: jwtId ?? undefined,
        expiresAt,
        ip,
        userAgent,
      },
    });
  }

  //no used
  async findByJwtId(jwtId: string) {
    return await this.prisma.refreshToken.findUnique({ where: { jwtId } });
  }

  //no used
  async findByFingerprint(fingerprint: string) {
    return await this.prisma.refreshToken.findUnique({
      where: {
        jti: fingerprint,
      },
    });
  }

  // التحقق من صحة التوكن المقدم
  async validateByPresentedToken(userId: string, presentedToken: string) {
    const fingerprint = this.hmacFingerprint(presentedToken);
    const token = await this.findByFingerprint(fingerprint);
    if (!token) return false;
    if (token.userId !== userId) return false;
    if (token.revokedAt) return false;
    if (token.expiresAt < new Date()) return false;
    const isValid = await argon2.verify(token.tokenHash, fingerprint);
    return isValid;
  }

  async revokedByJwtId(jwtId: string, userId: string, replacedBy?: string) {
    return await this.prisma.refreshToken.updateMany({
      where: { jwtId, userId, revokedAt: null },
      data: { revokedAt: new Date(), replacedBy },
    });
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

  async revokeByPresentedToken(userId: string, presentedToken: string) {
    const fingerprint = this.hmacFingerprint(presentedToken);
    const t = await this.findByFingerprint(fingerprint);
    if (!t) return null;
    return await this.prisma.refreshToken.update({
      where: { id: t.id },
      data: { revokedAt: new Date() },
    });
  }

  // async findByJti(jti: string) {
  //   return await this.prisma.refreshToken.findUnique({
  //     where: {
  //       jti,
  //     },
  //   });
  // }

  // async revokeByJti(jti: string, userId: string, replacedBy?: string) {
  //   return await this.prisma.refreshToken.updateMany({
  //     where: { jti, userId, revokedAt: null },
  //     data: { revokedAt: new Date(), replacedBy },
  //   });
  // }

  //نتحقق من وجود refresh token في DB function

  // async validate(userId: string, refreshToken: string): Promise<boolean> {
  //   const tokens = await this.prisma.refreshToken.findMany({
  //     where: {
  //       userId,
  //       revokedAt: null,
  //       expiresAt: { gte: new Date() }, // صالح إلى الآن
  //     },
  //   });
  //   for (const token of tokens) {
  //     const isValid = await bcrypt.compare(refreshToken, token.tokenHash);
  //     if (isValid) return true;
  //   }
  //   return false;
  // }

  // async revokedById(userId: string, refreshToken: string) {
  //   const token = await this.prisma.refreshToken.findMany({
  //     where: { userId, revokedAt: null },
  //   });
  //   for (const t of token) {
  //     const isMAtch = await bcrypt.compare(refreshToken, t.tokenHash);
  //     if (isMAtch) {
  //       await this.prisma.refreshToken.update({
  //         where: { id: t.id },
  //         data: { revokedAt: new Date() },
  //       });
  //       break; //break to stop loop
  //     }
  //   }
  // }

  //   await this.prisma.refreshToken.updateMany({
  //     where: { userId, tokenHash: refreshToken, revokedAt: null },
  //     data: { revokedAt: new Date() },
  //   });
  // }
}
