import { IsNotEmpty, IsUUID, IsIP } from 'class-validator';

export class CreateIpAddressDto {
  @IsIP(undefined, { message: 'Address must be a valid IPv4 or IPv6 address' })
  @IsNotEmpty({ message: 'IP address is required' })
  address: string;

  @IsUUID('4', { message: 'Website ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Website ID is required' })
  websiteId: string;
}

