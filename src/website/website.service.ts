import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWebsiteDto, UpdateWebsiteDto } from './dto';
import { createHmac } from 'crypto';

@Injectable()
export class WebsiteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWebsiteDto: CreateWebsiteDto) {
    const { domainAddresses, ipAddresses, ...websiteData } = createWebsiteDto;

    return this.prisma.website.create({
      data: {
        ...websiteData,
        domainAddresses: domainAddresses?.length
          ? {
              create: domainAddresses.map((address) => ({ address })),
            }
          : undefined,
        ipAddresses: ipAddresses?.length
          ? {
              create: ipAddresses.map((address) => ({ address })),
            }
          : undefined,
      },
      include: {
        domainAddresses: true,
        ipAddresses: true,
      },
    });
  }

  async findAll() {
    return this.prisma.website.findMany({
      include: {
        domainAddresses: true,
        ipAddresses: true,
      },
    });
  }

  async findOne(id: string) {
    const website = await this.prisma.website.findUnique({
      where: { id },
      include: {
        domainAddresses: true,
        ipAddresses: true,
      },
    });

    if (!website) {
      throw new NotFoundException(`Website with ID ${id} not found`);
    }

    return website;
  }

  async update(id: string, updateWebsiteDto: UpdateWebsiteDto) {
    await this.findOne(id);

    const { domainAddresses, ipAddresses, ...websiteData } = updateWebsiteDto;

    return this.prisma.website.update({
      where: { id },
      data: {
        ...websiteData,
        // If domainAddresses provided, replace all existing ones
        domainAddresses: domainAddresses
          ? {
              deleteMany: {},
              create: domainAddresses.map((address) => ({ address })),
            }
          : undefined,
        // If ipAddresses provided, replace all existing ones
        ipAddresses: ipAddresses
          ? {
              deleteMany: {},
              create: ipAddresses.map((address) => ({ address })),
            }
          : undefined,
      },
      include: {
        domainAddresses: true,
        ipAddresses: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.website.delete({
      where: { id },
    });
  }
  
  private generateTokenForMinute(websiteId: string, minute: number): string {
    const keyPrefix = process.env.TOKEN_KEY_PREFIX || 'default_key';
    const key = `${keyPrefix}${minute}`;
    return createHmac('sha256', key).update(websiteId).digest('hex');
  }

  async getCurrentToken(id: string) {
    await this.findOne(id);

    const currentTimeMinutes = Math.floor(Date.now() / 1000 / 60);
    const token = this.generateTokenForMinute(id, currentTimeMinutes);

    const expiresAt = (currentTimeMinutes + 2) * 60;

    return { 
      token, 
      websiteId: id,
      expiresAt,
    };
  }

  async verifyToken(websiteId: string, token: string) {
    const website = await this.prisma.website.findUnique({
      where: { id: websiteId },
      include: {
        domainAddresses: true,
        ipAddresses: true,
      },
    });

    if (!website) {
      return {
        valid: false,
        message: 'Website is invalid!',
      };
    }

    const currentTimeMinutes = Math.floor(Date.now() / 1000 / 60);

    const validTokens = [
      this.generateTokenForMinute(websiteId, currentTimeMinutes),
      this.generateTokenForMinute(websiteId, currentTimeMinutes - 1),
    ];

    const isValid = validTokens.includes(token);

    return {
      valid: isValid,
      websiteId,
      name: website.name,
      domainAddresses: website.domainAddresses.map((d) => d.address),
      message: isValid ? 'Token is valid - website is legitimate' : 'Token is invalid or expired',
    };
  }
}

