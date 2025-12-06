import { ApiProperty } from '@nestjs/swagger';

class WebsiteBasicDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ example: 'Google' })
  name: string;

  @ApiProperty({ example: '2025-12-06T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-12-06T12:00:00.000Z' })
  updatedAt: Date;
}

export class IpAddressWithWebsiteDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ example: '142.250.185.206' })
  address: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  websiteId: string;

  @ApiProperty({ type: WebsiteBasicDto })
  website: WebsiteBasicDto;

  @ApiProperty({ example: '2025-12-06T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-12-06T12:00:00.000Z' })
  updatedAt: Date;
}

