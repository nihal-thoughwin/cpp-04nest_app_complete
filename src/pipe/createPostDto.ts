import { IsInt, IsString } from 'class-validator';

export class createPostDto {
  @IsString()
  name: string;

  @IsInt()
  id: number;

  @IsString()
  email: string;
}
