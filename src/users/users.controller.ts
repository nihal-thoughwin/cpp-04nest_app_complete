import {
  All,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { BlogsService } from 'src/blogs/blogs.service';

@Controller('users')
export class UsersController {
  constructor(private blogService: BlogsService) {}

  @Get()
  userInfo(): string {
    console.log(process.env.POSTGRES_DATABASE);
    return 'USER PAGE';
  }

  @Get('history-page')
  useHistory(): object {
    return { id: 1, test: 'this is history' };
  }

  @Post('add-user')
  addUser(): string {
    return ' User add  ';
  }

  // @Body() is used to get data from body
  @Post('add-users')
  addUsers(@Body() record: any): string {
    console.log(record, '===');
    return ' User name added by using @Body method  ';
  }

  @All('add-user1')
  addUser1(): string {
    return ' User add by all method ';
  }

  @Post('list/:id')
  //   @httpCode is used to change status code
  //   @HttpCode(203)
  listUsers(@Param() record: any): string {
    console.log(record, '===');
    return 'list user' + record.id;
  }

  @Get('list')
  //   @Query is used to get query responce
  //   http://localhost:3000/users/list?id=12&name=nihal&email=nihal@thoughtwin.com
  listFilterUsers(@Query() record: any): string {
    console.log(record, '===');
    return 'list user' + record.id;
  }

  @Get('version*card')
  //   localhost:3000/users/versioncard
  // localhost:3000/users/version12345card
  // boyh will return detail
  detailPage(): string {
    return 'detail';
  }

  // //////////////////////////////

  // @Get('blog-list')
  // blogList() {
  //   return 'data aa gaya';
  // }

  // @Post('blog-add')
  // blogAdd(@Body() record: any) {
  //   return 'data aa gaya';
  // }

  @Get('blog-list')
  async blogList(): Promise<any[]> {
    return this.blogService.findData();
  }

  @Post('blog-add')
  blogAdd(@Body() record: any) {
    this.blogService.create(record);
  }
}
