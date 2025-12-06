import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIpAddressDto, UpdateIpAddressDto } from './dto';

@Injectable()
export class IpAddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createIpAddressDto: CreateIpAddressDto) {
    // Verify website exists
    const website = await this.prisma.website.findUnique({
      where: { id: createIpAddressDto.websiteId },
    });

    if (!website) {
      throw new NotFoundException(
        `Website with ID ${createIpAddressDto.websiteId} not found`,
      );
    }

    return this.prisma.iPAddress.create({
      data: createIpAddressDto,
    });
  }

  async findAll() {
    return this.prisma.iPAddress.findMany({
      include: {
        website: true,
      },
    });
  }

  async findOne(id: string) {
    const ipAddress = await this.prisma.iPAddress.findUnique({
      where: { id },
      include: {
        website: true,
      },
    });

    if (!ipAddress) {
      throw new NotFoundException(`IPAddress with ID ${id} not found`);
    }

    return ipAddress;
  }

  async findByWebsiteId(websiteId: string) {
    return this.prisma.iPAddress.findMany({
      where: { websiteId },
      include: {
        website: true,
      },
    });
  }

  async update(id: string, updateIpAddressDto: UpdateIpAddressDto) {
    await this.findOne(id);

    if (updateIpAddressDto.websiteId) {
      const website = await this.prisma.website.findUnique({
        where: { id: updateIpAddressDto.websiteId },
      });

      if (!website) {
        throw new NotFoundException(
          `Website with ID ${updateIpAddressDto.websiteId} not found`,
        );
      }
    }

    return this.prisma.iPAddress.update({
      where: { id },
      data: updateIpAddressDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.iPAddress.delete({
      where: { id },
    });
  }
}

