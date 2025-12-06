import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWebsiteDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

