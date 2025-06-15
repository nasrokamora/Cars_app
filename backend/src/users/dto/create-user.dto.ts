import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from 'generated/prisma';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username must be alphanumeric and can include underscores.',
  })
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;

  @IsOptional()
  role?: Role; // يمكن أن يكون هذا الحقل اختياريًا، إذا لم يتم تحديده سيتم تعيينه إلى 'user' افتراضيًا
}
