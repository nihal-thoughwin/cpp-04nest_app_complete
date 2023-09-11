import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class AuthPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('ok', value);
    if ((value = '22')) {
      throw new BadRequestException('Invalid!!!!!!! ');
    }
    return value;
  }
}
