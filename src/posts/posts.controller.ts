import {
  Body,
  Controller,
  DefaultValuePipe,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { HttpExceptionFilter } from 'src/exception/http.Filter';

import { AuthGuard } from 'src/guards/auth.guards';
import { loggingInterceptor } from 'src/interceptors/logging.interceptors';
import { AuthPipe } from 'src/pipe/AuthPipe';
import { createPostDto } from 'src/pipe/createPostDto';

@Controller('posts')
//in controller every route will use this
// @UseInterceptors(loggingInterceptor)
export class PostsController {
  // @Get('post-list')
  // postList() {
  //   return 'post list';
  // }

  @Get('post-list')
  @UseInterceptors(loggingInterceptor) // in routes
  // @UseGuards(AuthGuard)
  postList(): object {
    console.log('API Call');
    return { data: 'post list', id: 12, item: [{ name: 'test' }] };
  }

  @Get('post-add/:id')
  postAdd() {
    return 'post add';
  }

  @Get('post-add1')
  @UseInterceptors(FileInterceptor('profile'))
  postAdd1(@UploadedFile() profile: Express.Multer.File): object {
    console.log(profile);
    return {
      message: 'file upload',
    };
  }
  /////////////////

  @Get('post-add2')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'profile',
        maxCount: 2,
      },
      {
        name: 'profile2',
        maxCount: 1,
      },
    ]),
  )
  postAdd2(
    @UploadedFiles()
    profile: {
      profile?: Express.Multer.File[];
      profile2?: Express.Multer.File[];
    },
  ): object {
    console.log(profile);
    return {
      message: 'file upload',
    };
  }

  /////////////////////

  @Get('post-add3')
  @UseInterceptors(FileInterceptor('profile'))
  postAdd3(
    @UploadedFiles()
    profile: Array<Express.Multer.File>,
  ): object {
    console.log(profile);
    return {
      message: 'files uploaded',
    };
  }

  /////////////
  @Get('detail')
  postDetail() {
    return 'post detail';
  }

  //   @Get('info/:id')
  //   postInfo(@Param('id', ParseIntPipe) id: number): object {
  //     if (id == 12) {
  //       //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  //       // custom using object
  //       throw new HttpException(
  //         {
  //           status: HttpStatus.ACCEPTED,
  //           error: 'custom error',
  //         },
  //         HttpStatus.ACCEPTED,
  //       );
  //     }
  //     return {
  //       id: id,
  //       data: 'NA',
  //     };
  //   }

  @Get('info/:id')
  //   @UseFilters(new HttpExceptionFilter())
  postInfo(@Param('id', ParseIntPipe) id: number): object {
    if (id == 12) {
      throw new ForbiddenException();
    }
    return {
      id: id,
      data: 'NA',
    };
  }

  //   @Post('lists/:id')
  //   detailById(@Param('id', ParseIntPipe) id: number): string {
  //     console.log(id, '===');
  //     return 'list user' + id;
  //   }

  //   @Post('lists/:id')
  //   detailById(
  //     @Param(
  //       'id',
  //       new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //     )
  //     id: number,
  //   ): string {
  //     console.log(id, '===');
  //     return 'list user' + id;
  //   }

  //   @Post('lists/:id')
  //   detailById(
  //     @Query('page', new DefaultValuePipe(0))
  //     page: number,
  //   ): string {
  //     console.log(page, '===');
  //     return 'list user' + page;
  //   }

  //   @Post('lists/:id')
  //   detailById(
  //     @Query('id', new ParseArrayPipe({ items: Number, separator: ',' }))
  //     id: number[],
  //   ): string {
  //     console.log(id, '===');
  //     return 'list user' + id;
  //   }

  //   @Post('lists/:id')
  //   @UsePipes(new AuthPipe())
  //   detailById(
  //     @Param('id')
  //     id: number,
  //   ): string {
  //     return 'list user' + id;
  //   }

  @Post('lists/:id')
  @UsePipes(ValidationPipe)
  detailById(@Body() createPostDto: createPostDto) {
    console.log(createPostDto);
    return 'list user';
  }
}
