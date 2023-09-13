import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JWTPayload } from 'src/auth/types/auth.types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request?.user as JWTPayload;
    if (!user) {
      throw new UnauthorizedException();
    }

    const match = await this.matchRoles(user.sub, roles);
    if (!match) {
      throw new UnauthorizedException();
    }

    return true;
  }

  async matchRoles(userId: string, roles: string[]): Promise<boolean> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        roles: true,
      },
    });

    if (!user || !Object.keys(user).length) {
      return false;
    }

    const { roles: userRoles } = user;

    return userRoles.some((role) => roles.includes(role));
  }
}
