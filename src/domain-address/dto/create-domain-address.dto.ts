import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateDomainAddressDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsUUID()
  @IsNotEmpty()
  websiteId: string;
}

