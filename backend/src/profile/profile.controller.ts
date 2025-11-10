import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthUser } from 'src/users/types/user.types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/decorator/user.decorator';
import { RemovePasswordInterceptor } from 'src/Interceptors/remove-password.interceptor';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(RemovePasswordInterceptor)
  @Get()
  async getProfile(@User() user: AuthUser) {
    return await this.profileService.getProfile(user.id);
  }
}
