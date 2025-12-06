import { ApiProperty } from '@nestjs/swagger';

export class DomainAddressResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ example: 'www.google.com' })
  address: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  websiteId: string;

  @ApiProperty({ example: '2025-12-06T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-12-06T12:00:00.000Z' })
  updatedAt: Date;
}

export class IpAddressResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ example: '142.250.185.206' })
  address: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  websiteId: string;

  @ApiProperty({ example: '2025-12-06T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-12-06T12:00:00.000Z' })
  updatedAt: Date;
}

export class WebsiteResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ example: 'Google' })
  name: string;

  @ApiProperty({ type: [DomainAddressResponseDto] })
  domainAddresses: DomainAddressResponseDto[];

  @ApiProperty({ type: [IpAddressResponseDto] })
  ipAddresses: IpAddressResponseDto[];

  @ApiProperty({ example: '2025-12-06T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-12-06T12:00:00.000Z' })
  updatedAt: Date;
}

export class TokenResponseDto {
  @ApiProperty({ 
    example: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
    description: 'HMAC-SHA256 token for QR code'
  })
  token: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  websiteId: string;

  @ApiProperty({ 
    example: 1733494800,
    description: 'Unix timestamp when the token expires'
  })
  expiresAt: number;
}

export class VerifyTokenResponseDto {
  @ApiProperty({ example: true, description: 'Whether the token is valid' })
  valid: boolean;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  websiteId: string;

  @ApiProperty({ example: 'Google', nullable: true, description: 'Website name (null if not found)' })
  name: string | null;

  @ApiProperty({ 
    example: ['www.google.com', 'mail.google.com'],
    description: 'List of domain addresses for the website (empty if not found)'
  })
  domainAddresses: string[];

  @ApiProperty({ 
    example: 'Token is valid - website is legitimate',
    description: 'Human-readable verification message'
  })
  message: string;
}

