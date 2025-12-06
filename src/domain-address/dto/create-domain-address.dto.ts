import { IsNotEmpty, IsUUID, IsFQDN } from 'class-validator';

export class CreateDomainAddressDto {
  @IsFQDN({}, { message: 'Address must be a valid domain (e.g., example.com, www.example.com)' })
  @IsNotEmpty({ message: 'Domain address is required' })
  address: string;

  @IsUUID('4', { message: 'Website ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Website ID is required' })
  websiteId: string;
}

