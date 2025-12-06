import { IsNotEmpty, IsUUID, IsIP } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIpAddressDto {
  @ApiProperty({
    description: 'The IP address (IPv4 or IPv6)',
    example: '142.250.185.206',
  })
  @IsIP(undefined, { message: 'Address must be a valid IPv4 or IPv6 address' })
  @IsNotEmpty({ message: 'IP address is required' })
  address: string;

  @ApiProperty({
    description: 'The ID of the website this IP belongs to',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    format: 'uuid',
  })
  @IsUUID('4', { message: 'Website ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Website ID is required' })
  websiteId: string;
}

