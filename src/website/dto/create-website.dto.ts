import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  MinLength,
  MaxLength,
  IsFQDN,
  IsIP,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWebsiteDto {
  @ApiProperty({
    description: 'The name of the website',
    example: 'Google',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty({ message: 'Website name is required' })
  @MinLength(2, { message: 'Website name must be at least 2 characters' })
  @MaxLength(255, { message: 'Website name must not exceed 255 characters' })
  name: string;

  @ApiPropertyOptional({
    description: 'Array of domain addresses for the website',
    example: ['www.google.com', 'mail.google.com'],
    type: [String],
  })
  @IsOptional()
  @IsArray({ message: 'domainAddresses must be an array' })
  @ArrayMinSize(1, { message: 'domainAddresses must contain at least 1 domain' })
  @IsFQDN({}, { each: true, message: 'Each domain address must be a valid domain (e.g., example.com)' })
  domainAddresses?: string[];

  @ApiPropertyOptional({
    description: 'Array of IP addresses for the website',
    example: ['142.250.185.206', '172.217.16.142'],
    type: [String],
  })
  @IsOptional()
  @IsArray({ message: 'ipAddresses must be an array' })
  @ArrayMinSize(1, { message: 'ipAddresses must contain at least 1 IP' })
  @IsIP(undefined, { each: true, message: 'Each IP address must be a valid IPv4 or IPv6 address' })
  ipAddresses?: string[];
}

