import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class RefreshTokenService {
    private readonly SALT_ROUNDS = 10;

    constructor(private readonly prisma: PrismaService) {}

    //نقوم بانشاء refresh token جديد فل DB

    async create(userId:string, refreshToken:string, expiresAt:Date, ip?:string, userAgent?:string) {

        //نقوم بانشاء تشفير لل refresh token بستخدام bcrypt
        const tokenHash = await bcrypt.hash(refreshToken, this.SALT_ROUNDS);
        return this.prisma.refreshToken.create({
            data:{
                userId,
                tokenHash,
                expiresAt,
                ip,
                userAgent,
            }
        })

    //نتحقق من وجود refresh token في DB

    // ابطال جميع tokens (logout)

    // إبطال توكن واحد (مثلاً لو استخدم جهاز واحد logout)
}
