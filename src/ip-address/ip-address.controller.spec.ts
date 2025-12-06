import { Test, TestingModule } from '@nestjs/testing';
import { IpAddressController } from './ip-address.controller';
import { IpAddressService } from './ip-address.service';

describe('IpAddressController', () => {
  let controller: IpAddressController;
  let service: IpAddressService;

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

  const mockIpAddressService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByWebsiteId: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpAddressController],
      providers: [
        {
          provide: IpAddressService,
          useValue: mockIpAddressService,
        },
      ],
    }).compile();

    controller = module.get<IpAddressController>(IpAddressController);
    service = module.get<IpAddressService>(IpAddressService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an IP address', async () => {
      const createDto = { address: '192.168.1.1', websiteId: mockWebsite.id };
      mockIpAddressService.create.mockResolvedValue(mockIpAddress);

      const result = await controller.create(createDto);

      expect(result).toEqual(mockIpAddress);
      expect(mockIpAddressService.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of IP addresses', async () => {
      mockIpAddressService.findAll.mockResolvedValue([mockIpAddress]);

      const result = await controller.findAll();

      expect(result).toEqual([mockIpAddress]);
      expect(mockIpAddressService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an IP address by id', async () => {
      mockIpAddressService.findOne.mockResolvedValue(mockIpAddress);

      const result = await controller.findOne(mockIpAddress.id);

      expect(result).toEqual(mockIpAddress);
      expect(mockIpAddressService.findOne).toHaveBeenCalledWith(mockIpAddress.id);
    });
  });

  describe('findByWebsiteId', () => {
    it('should return IP addresses by website id', async () => {
      mockIpAddressService.findByWebsiteId.mockResolvedValue([mockIpAddress]);

      const result = await controller.findByWebsiteId(mockWebsite.id);

      expect(result).toEqual([mockIpAddress]);
      expect(mockIpAddressService.findByWebsiteId).toHaveBeenCalledWith(
        mockWebsite.id,
      );
    });
  });

  describe('update', () => {
    it('should update an IP address', async () => {
      const updateDto = { address: '10.0.0.1' };
      const updatedIpAddress = { ...mockIpAddress, ...updateDto };
      mockIpAddressService.update.mockResolvedValue(updatedIpAddress);

      const result = await controller.update(mockIpAddress.id, updateDto);

      expect(result).toEqual(updatedIpAddress);
      expect(mockIpAddressService.update).toHaveBeenCalledWith(
        mockIpAddress.id,
        updateDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove an IP address', async () => {
      mockIpAddressService.remove.mockResolvedValue(mockIpAddress);

      const result = await controller.remove(mockIpAddress.id);

      expect(result).toEqual(mockIpAddress);
      expect(mockIpAddressService.remove).toHaveBeenCalledWith(mockIpAddress.id);
    });
  });
});

