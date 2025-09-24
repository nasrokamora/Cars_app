// // import { Injectable } from '@nestjs/common';
// // import * as bcrypt from 'bcrypt';
// // import { PrismaService } from 'src/prisma/prisma.service';

// // @Injectable()
// // export class refreshToknService {
// //   private readonly SALT_ROUND = 10;

// //   constructor(private readonly prisma: PrismaService) {}

// //   private hmacFingerprint(token:sting){
// //     const secret = process.env.HMAC_SECRET;
// //     if(!secret) throw new error('error hmac')
// //       return crypto.hmac
// //   }
// //   // create refresh token

// //   //   async create(userId:string, refreshToken:string, createdAt:Date, ip?:string, userAgent?:string{

// //   //   }

// //   // //   async create(
// //   // //     userId: string,
// //   // //     refreshToken: string,
// //   // //     createdAt: Date,
// //   // //     ip?: string,
// //   // //     userAgent?: string,
// //   // //   ) {
// //   // //     const tokenHashs = await bcrypt.hash(refreshToken, this.SALT_ROUND);
// //   // //     return this.prisma.refreshToken.create({
// //   // //       data: {
// //   // //         userId,
// //   // //         tokenHashs,
// //   // //         createdAt,
// //   // //         ip,
// //   // //         userAgent,
// //   // //       },
// //   // //     });
// //   // //   }

// //   // //   async validate(userId: string, refreshToken: string): Promise<boolean> {
// //   // //     const tokens = await this.prisma.refreshToken.findMany({
// //   // //       where: {
// //   // //         userId,
// //   // //         revokedAt: null,
// //   // //         expiresAt: { gte: new Date() },
// //   // //       },
// //   // //     });
// //   // //     for (const token of tokens) {
// //   // //       const match = await bcrypt.compare(refreshToken, token.tokenHashs);
// //   // //       if (match) return true;
// //   // //     }
// //   // //     return false;
// //   // //   }

// //   // //   async revokedAll(userId: string) {
// //   // //     await this.prisma.refreshToken.updateMany({
// //   // //       where: {
// //   // //         userId,
// //   // //         revokedAt: null,
// //   // //       },
// //   // //       data: {
// //   // //         revokedAt: new Date(),
// //   // //       },
// //   // //     });
// //   // //   }
// // }
