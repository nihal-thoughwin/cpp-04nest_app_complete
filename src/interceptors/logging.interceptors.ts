import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class loggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    console.log('First call', request.headers);
    // return (
    //   next
    //     //
    //     .handle()
    //     //
    //     .pipe(tap(() => console.log('Last call')))

    // return (
    //   next
    //     //
    //     .handle()
    //     //
    //     .pipe(
    //       map((data: any) => {
    //         // console.log(data);
    //         return {
    //           ...data,
    //           newTokens: 'ljsdakdfgjasfd',
    //         };
    //       }),
    //     )
    // );

    const redisCache = true;
    // const redisCache = false;
    if (redisCache) {
      //   return of([]);
      return of([
        {
          id: 1,
          message: 'data from cachce',
        },
      ]);
    }
    return next.handle();
  }
}
