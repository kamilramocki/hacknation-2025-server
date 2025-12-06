import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateIpAddressDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsUUID()
  @IsNotEmpty()
  websiteId: string;
}

