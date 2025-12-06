import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { PrismaService } from '../prisma/prisma.service';

describe('WebsiteService', () => {
  let service: WebsiteService;
  let prisma: PrismaService;

  const mockWebsite = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test Website',
    createdAt: new Date(),
    updatedAt: new Date(),
    domainAddresses: [],
    ipAddresses: [],
  };

  const mockPrismaService = {
    website: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebsiteService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<WebsiteService>(WebsiteService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a website', async () => {
      const createDto = { name: 'Test Website' };
      mockPrismaService.website.create.mockResolvedValue(mockWebsite);

      const result = await service.create(createDto);

      expect(result).toEqual(mockWebsite);
      expect(mockPrismaService.website.create).toHaveBeenCalledWith({
        data: createDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of websites', async () => {
      mockPrismaService.website.findMany.mockResolvedValue([mockWebsite]);

      const result = await service.findAll();

      expect(result).toEqual([mockWebsite]);
      expect(mockPrismaService.website.findMany).toHaveBeenCalledWith({
        include: {
          domainAddresses: true,
          ipAddresses: true,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a website by id', async () => {
      mockPrismaService.website.findUnique.mockResolvedValue(mockWebsite);

      const result = await service.findOne(mockWebsite.id);

      expect(result).toEqual(mockWebsite);
      expect(mockPrismaService.website.findUnique).toHaveBeenCalledWith({
        where: { id: mockWebsite.id },
        include: {
          domainAddresses: true,
          ipAddresses: true,
        },
      });
    });

    it('should throw NotFoundException if website not found', async () => {
      mockPrismaService.website.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a website', async () => {
      const updateDto = { name: 'Updated Website' };
      const updatedWebsite = { ...mockWebsite, ...updateDto };

      mockPrismaService.website.findUnique.mockResolvedValue(mockWebsite);
      mockPrismaService.website.update.mockResolvedValue(updatedWebsite);

      const result = await service.update(mockWebsite.id, updateDto);

      expect(result).toEqual(updatedWebsite);
      expect(mockPrismaService.website.update).toHaveBeenCalledWith({
        where: { id: mockWebsite.id },
        data: updateDto,
      });
    });

    it('should throw NotFoundException if website not found', async () => {
      mockPrismaService.website.findUnique.mockResolvedValue(null);

      await expect(
        service.update('non-existent-id', { name: 'Test' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a website', async () => {
      mockPrismaService.website.findUnique.mockResolvedValue(mockWebsite);
      mockPrismaService.website.delete.mockResolvedValue(mockWebsite);

      const result = await service.remove(mockWebsite.id);

      expect(result).toEqual(mockWebsite);
      expect(mockPrismaService.website.delete).toHaveBeenCalledWith({
        where: { id: mockWebsite.id },
      });
    });

    it('should throw NotFoundException if website not found', async () => {
      mockPrismaService.website.findUnique.mockResolvedValue(null);

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

