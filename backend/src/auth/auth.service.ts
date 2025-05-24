import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { RegisterAuthDto } from './dto/register-auth.dto';
// import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    // private readonly usersService: UsersService,
  ) {}
}
