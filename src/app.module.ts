import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { EmployeeModule } from './employee/employee.module';
import { BlogsService } from './blogs/blogs.service';
import { AuthMiddleware } from './middleware/auth';
import { AuthMiddleware2 } from './middleware/auth2';
import { PostsController } from './posts/posts.controller';

import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './exception/http.Filter';
import { AuthGuard } from './guards/auth.guards';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { SuperAdminModule } from './super-admin/super-admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '.development.env',
      envFilePath: ['.development.env', '.env'],
      isGlobal: true,
      // ignoreEnvFile: true,
    }),
    EmployeeModule,
    MulterModule.register({
      dest: './uploads',
    }),
    SuperAdminModule,
  ],
  controllers: [AppController, UsersController, PostsController],
  providers: [
    AppService,
    BlogsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // }, // fir specific provider
  ],
})

// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // throw new Error('Method not implemented.');
    consumer
      .apply(AuthMiddleware, AuthMiddleware2)
      .exclude({
        // can set specific path
        path: 'posts/post-list',
        method: RequestMethod.GET,
      })
      .forRoutes('posts'); //post
    //.forRoutes('posts'); //post
    //.forRoutes(PostsController); //controller
    // .forRoutes({
    //   // can set specific path
    //   path: 'posts/post-list',
    //   method: RequestMethod.GET,
    // });
  }
}
