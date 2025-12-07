import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers['authorization'];

    if (!auth) {
      throw new UnauthorizedException('Missing Authorization Header');
    }

    const [type, encoded] = auth.split(' ');

    if (type !== 'Basic' || !encoded) {
      throw new UnauthorizedException('Invalid Authorization Header');
    }

    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const [username, password] = decoded.split(':');

    if (username !== 'admin' || password !== 'password') {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return true;
  }
}
