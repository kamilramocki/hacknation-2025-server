import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWebsiteDto, UpdateWebsiteDto } from './dto';

@Injectable()
export class WebsiteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWebsiteDto: CreateWebsiteDto) {
    return this.prisma.website.create({
      data: createWebsiteDto,
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

    return this.prisma.website.update({
      where: { id },
      data: updateWebsiteDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.website.delete({
      where: { id },
    });
  }
}

