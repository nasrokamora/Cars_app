import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> | Promise<Observable<unknown>> {
    return next
      .handle()
      .pipe(map((data: unknown) => this.removePasswordField(data)));
  }

  private removePasswordField(data: unknown): unknown {
    if (Array.isArray(data)) {
      return (data as Array<unknown>).map((item) =>
        this.removePasswordField(item),
      );
    }
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      const cloned: Record<string, unknown> = {
        ...(data as Record<string, unknown>),
      };

      for (const key in cloned) {
        if (key === 'password') {
          delete cloned[key];
        } else if (cloned[key] && typeof cloned[key] === 'object') {
          cloned[key] = this.removePasswordField(cloned[key]);
        }
      }
      return cloned;
    }
    return data;
  }
}
