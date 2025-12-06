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

export class CreateWebsiteDto {
  @IsString()
  @IsNotEmpty({ message: 'Website name is required' })
  @MinLength(2, { message: 'Website name must be at least 2 characters' })
  @MaxLength(255, { message: 'Website name must not exceed 255 characters' })
  name: string;

  @IsOptional()
  @IsArray({ message: 'domainAddresses must be an array' })
  @ArrayMinSize(1, { message: 'domainAddresses must contain at least 1 domain' })
  @IsFQDN({}, { each: true, message: 'Each domain address must be a valid domain (e.g., example.com)' })
  domainAddresses?: string[];

  @IsOptional()
  @IsArray({ message: 'ipAddresses must be an array' })
  @ArrayMinSize(1, { message: 'ipAddresses must contain at least 1 IP' })
  @IsIP(undefined, { each: true, message: 'Each IP address must be a valid IPv4 or IPv6 address' })
  ipAddresses?: string[];
}

