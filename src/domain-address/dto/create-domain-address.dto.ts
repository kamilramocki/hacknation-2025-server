import { IsNotEmpty, IsUUID, IsFQDN } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDomainAddressDto {
  @ApiProperty({
    description: 'The domain address (FQDN)',
    example: 'www.google.com',
  })
  @IsFQDN({}, { message: 'Address must be a valid domain (e.g., example.com, www.example.com)' })
  @IsNotEmpty({ message: 'Domain address is required' })
  address: string;

  @ApiProperty({
    description: 'The ID of the website this domain belongs to',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    format: 'uuid',
  })
  @IsUUID('4', { message: 'Website ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Website ID is required' })
  websiteId: string;
}

