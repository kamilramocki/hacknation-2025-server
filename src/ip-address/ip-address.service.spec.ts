import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { IpAddressService } from './ip-address.service';
import { PrismaService } from '../prisma/prisma.service';

describe('IpAddressService', () => {
  let service: IpAddressService;
  let prisma: PrismaService;

  const mockWebsite = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test Website',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockIpAddress = {
    id: '323e4567-e89b-12d3-a456-426614174000',
    address: '192.168.1.1',
    websiteId: mockWebsite.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    website: mockWebsite,
  };

  const mockPrismaService = {
    website: {
      findUnique: jest.fn(),
    },
    iPAddress: {
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
        IpAddressService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<IpAddressService>(IpAddressService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an IP address', async () => {
      const createDto = { address: '192.168.1.1', websiteId: mockWebsite.id };
      mockPrismaService.website.findUnique.mockResolvedValue(mockWebsite);
      mockPrismaService.iPAddress.create.mockResolvedValue(mockIpAddress);

      const result = await service.create(createDto);

      expect(result).toEqual(mockIpAddress);
      expect(mockPrismaService.iPAddress.create).toHaveBeenCalledWith({
        data: createDto,
      });
    });

    it('should throw NotFoundException if website not found', async () => {
      const createDto = { address: '192.168.1.1', websiteId: 'non-existent-id' };
      mockPrismaService.website.findUnique.mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of IP addresses', async () => {
      mockPrismaService.iPAddress.findMany.mockResolvedValue([mockIpAddress]);

      const result = await service.findAll();

      expect(result).toEqual([mockIpAddress]);
      expect(mockPrismaService.iPAddress.findMany).toHaveBeenCalledWith({
        include: { website: true },
      });
    });
  });

  describe('findOne', () => {
    it('should return an IP address by id', async () => {
      mockPrismaService.iPAddress.findUnique.mockResolvedValue(mockIpAddress);

      const result = await service.findOne(mockIpAddress.id);

      expect(result).toEqual(mockIpAddress);
      expect(mockPrismaService.iPAddress.findUnique).toHaveBeenCalledWith({
        where: { id: mockIpAddress.id },
        include: { website: true },
      });
    });

    it('should throw NotFoundException if IP address not found', async () => {
      mockPrismaService.iPAddress.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByWebsiteId', () => {
    it('should return IP addresses by website id', async () => {
      mockPrismaService.iPAddress.findMany.mockResolvedValue([mockIpAddress]);

      const result = await service.findByWebsiteId(mockWebsite.id);

      expect(result).toEqual([mockIpAddress]);
      expect(mockPrismaService.iPAddress.findMany).toHaveBeenCalledWith({
        where: { websiteId: mockWebsite.id },
        include: { website: true },
      });
    });
  });

  describe('update', () => {
    it('should update an IP address', async () => {
      const updateDto = { address: '10.0.0.1' };
      const updatedIpAddress = { ...mockIpAddress, ...updateDto };

      mockPrismaService.iPAddress.findUnique.mockResolvedValue(mockIpAddress);
      mockPrismaService.iPAddress.update.mockResolvedValue(updatedIpAddress);

      const result = await service.update(mockIpAddress.id, updateDto);

      expect(result).toEqual(updatedIpAddress);
      expect(mockPrismaService.iPAddress.update).toHaveBeenCalledWith({
        where: { id: mockIpAddress.id },
        data: updateDto,
      });
    });

    it('should throw NotFoundException if IP address not found', async () => {
      mockPrismaService.iPAddress.findUnique.mockResolvedValue(null);

      await expect(
        service.update('non-existent-id', { address: '10.0.0.1' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if new websiteId not found', async () => {
      const updateDto = { websiteId: 'non-existent-website-id' };

      mockPrismaService.iPAddress.findUnique.mockResolvedValue(mockIpAddress);
      mockPrismaService.website.findUnique.mockResolvedValue(null);

      await expect(
        service.update(mockIpAddress.id, updateDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an IP address', async () => {
      mockPrismaService.iPAddress.findUnique.mockResolvedValue(mockIpAddress);
      mockPrismaService.iPAddress.delete.mockResolvedValue(mockIpAddress);

      const result = await service.remove(mockIpAddress.id);

      expect(result).toEqual(mockIpAddress);
      expect(mockPrismaService.iPAddress.delete).toHaveBeenCalledWith({
        where: { id: mockIpAddress.id },
      });
    });

    it('should throw NotFoundException if IP address not found', async () => {
      mockPrismaService.iPAddress.findUnique.mockResolvedValue(null);

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

