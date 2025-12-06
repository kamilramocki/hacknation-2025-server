import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDomainAddressDto, UpdateDomainAddressDto } from './dto';

@Injectable()
export class DomainAddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDomainAddressDto: CreateDomainAddressDto) {
    // Verify website exists
    const website = await this.prisma.website.findUnique({
      where: { id: createDomainAddressDto.websiteId },
    });

    if (!website) {
      throw new NotFoundException(
        `Website with ID ${createDomainAddressDto.websiteId} not found`,
      );
    }

    return this.prisma.domainAddress.create({
      data: createDomainAddressDto,
    });
  }

  async findAll() {
    return this.prisma.domainAddress.findMany({
      include: {
        website: true,
      },
    });
  }

  async findOne(id: string) {
    const domainAddress = await this.prisma.domainAddress.findUnique({
      where: { id },
      include: {
        website: true,
      },
    });

    if (!domainAddress) {
      throw new NotFoundException(`DomainAddress with ID ${id} not found`);
    }

    return domainAddress;
  }

  async findByWebsiteId(websiteId: string) {
    return this.prisma.domainAddress.findMany({
      where: { websiteId },
      include: {
        website: true,
      },
    });
  }

  async update(id: string, updateDomainAddressDto: UpdateDomainAddressDto) {
    await this.findOne(id);

    if (updateDomainAddressDto.websiteId) {
      const website = await this.prisma.website.findUnique({
        where: { id: updateDomainAddressDto.websiteId },
      });

      if (!website) {
        throw new NotFoundException(
          `Website with ID ${updateDomainAddressDto.websiteId} not found`,
        );
      }
    }

    return this.prisma.domainAddress.update({
      where: { id },
      data: updateDomainAddressDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.domainAddress.delete({
      where: { id },
    });
  }
}

