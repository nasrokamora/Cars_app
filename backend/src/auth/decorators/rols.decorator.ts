import { SetMetadata } from '@nestjs/common';
import { Role } from '../interface/Role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
