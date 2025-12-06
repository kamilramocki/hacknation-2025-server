import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DomainAddressService } from './domain-address.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DomainAddressService', () => {
  let service: DomainAddressService;
  let prisma: PrismaService;

  const mockWebsite = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test Website',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockDomainAddress = {
    id: '223e4567-e89b-12d3-a456-426614174000',
    address: 'example.com',
    websiteId: mockWebsite.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    website: mockWebsite,
  };

  const mockPrismaService = {
    website: {
      findUnique: jest.fn(),
    },
    domainAddress: {
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
        DomainAddressService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<DomainAddressService>(DomainAddressService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a domain address', async () => {
      const createDto = { address: 'example.com', websiteId: mockWebsite.id };
      mockPrismaService.website.findUnique.mockResolvedValue(mockWebsite);
      mockPrismaService.domainAddress.create.mockResolvedValue(mockDomainAddress);

      const result = await service.create(createDto);

      expect(result).toEqual(mockDomainAddress);
      expect(mockPrismaService.domainAddress.create).toHaveBeenCalledWith({
        data: createDto,
      });
    });

    it('should throw NotFoundException if website not found', async () => {
      const createDto = { address: 'example.com', websiteId: 'non-existent-id' };
      mockPrismaService.website.findUnique.mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of domain addresses', async () => {
      mockPrismaService.domainAddress.findMany.mockResolvedValue([mockDomainAddress]);

      const result = await service.findAll();

      expect(result).toEqual([mockDomainAddress]);
      expect(mockPrismaService.domainAddress.findMany).toHaveBeenCalledWith({
        include: { website: true },
      });
    });
  });

  describe('findOne', () => {
    it('should return a domain address by id', async () => {
      mockPrismaService.domainAddress.findUnique.mockResolvedValue(mockDomainAddress);

      const result = await service.findOne(mockDomainAddress.id);

      expect(result).toEqual(mockDomainAddress);
      expect(mockPrismaService.domainAddress.findUnique).toHaveBeenCalledWith({
        where: { id: mockDomainAddress.id },
        include: { website: true },
      });
    });

    it('should throw NotFoundException if domain address not found', async () => {
      mockPrismaService.domainAddress.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByWebsiteId', () => {
    it('should return domain addresses by website id', async () => {
      mockPrismaService.domainAddress.findMany.mockResolvedValue([mockDomainAddress]);

      const result = await service.findByWebsiteId(mockWebsite.id);

      expect(result).toEqual([mockDomainAddress]);
      expect(mockPrismaService.domainAddress.findMany).toHaveBeenCalledWith({
        where: { websiteId: mockWebsite.id },
        include: { website: true },
      });
    });
  });

  describe('update', () => {
    it('should update a domain address', async () => {
      const updateDto = { address: 'updated.example.com' };
      const updatedDomainAddress = { ...mockDomainAddress, ...updateDto };

      mockPrismaService.domainAddress.findUnique.mockResolvedValue(mockDomainAddress);
      mockPrismaService.domainAddress.update.mockResolvedValue(updatedDomainAddress);

      const result = await service.update(mockDomainAddress.id, updateDto);

      expect(result).toEqual(updatedDomainAddress);
      expect(mockPrismaService.domainAddress.update).toHaveBeenCalledWith({
        where: { id: mockDomainAddress.id },
        data: updateDto,
      });
    });

    it('should throw NotFoundException if domain address not found', async () => {
      mockPrismaService.domainAddress.findUnique.mockResolvedValue(null);

      await expect(
        service.update('non-existent-id', { address: 'test.com' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if new websiteId not found', async () => {
      const updateDto = { websiteId: 'non-existent-website-id' };

      mockPrismaService.domainAddress.findUnique.mockResolvedValue(mockDomainAddress);
      mockPrismaService.website.findUnique.mockResolvedValue(null);

      await expect(
        service.update(mockDomainAddress.id, updateDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a domain address', async () => {
      mockPrismaService.domainAddress.findUnique.mockResolvedValue(mockDomainAddress);
      mockPrismaService.domainAddress.delete.mockResolvedValue(mockDomainAddress);

      const result = await service.remove(mockDomainAddress.id);

      expect(result).toEqual(mockDomainAddress);
      expect(mockPrismaService.domainAddress.delete).toHaveBeenCalledWith({
        where: { id: mockDomainAddress.id },
      });
    });

    it('should throw NotFoundException if domain address not found', async () => {
      mockPrismaService.domainAddress.findUnique.mockResolvedValue(null);

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

