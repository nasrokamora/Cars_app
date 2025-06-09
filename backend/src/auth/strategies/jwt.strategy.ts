import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/users/users.service';
import { JwtPayloadInterface } from '../dto/jwt-payload.interface';
// import { JwtPayloadInterface } from '../dto/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  async validate(payload: JwtPayloadInterface) {
    const { userId, email } = payload;
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return { userId, email };
  }
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get<string>('JWT_SECRET') ?? 'default_jwt_secret',
    });
  }
}
