import { Test, TestingModule } from '@nestjs/testing';
import { DomainAddressController } from './domain-address.controller';
import { DomainAddressService } from './domain-address.service';

describe('DomainAddressController', () => {
  let controller: DomainAddressController;
  let service: DomainAddressService;

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

  const mockDomainAddressService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByWebsiteId: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomainAddressController],
      providers: [
        {
          provide: DomainAddressService,
          useValue: mockDomainAddressService,
        },
      ],
    }).compile();

    controller = module.get<DomainAddressController>(DomainAddressController);
    service = module.get<DomainAddressService>(DomainAddressService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a domain address', async () => {
      const createDto = { address: 'example.com', websiteId: mockWebsite.id };
      mockDomainAddressService.create.mockResolvedValue(mockDomainAddress);

      const result = await controller.create(createDto);

      expect(result).toEqual(mockDomainAddress);
      expect(mockDomainAddressService.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of domain addresses', async () => {
      mockDomainAddressService.findAll.mockResolvedValue([mockDomainAddress]);

      const result = await controller.findAll();

      expect(result).toEqual([mockDomainAddress]);
      expect(mockDomainAddressService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a domain address by id', async () => {
      mockDomainAddressService.findOne.mockResolvedValue(mockDomainAddress);

      const result = await controller.findOne(mockDomainAddress.id);

      expect(result).toEqual(mockDomainAddress);
      expect(mockDomainAddressService.findOne).toHaveBeenCalledWith(
        mockDomainAddress.id,
      );
    });
  });

  describe('findByWebsiteId', () => {
    it('should return domain addresses by website id', async () => {
      mockDomainAddressService.findByWebsiteId.mockResolvedValue([mockDomainAddress]);

      const result = await controller.findByWebsiteId(mockWebsite.id);

      expect(result).toEqual([mockDomainAddress]);
      expect(mockDomainAddressService.findByWebsiteId).toHaveBeenCalledWith(
        mockWebsite.id,
      );
    });
  });

  describe('update', () => {
    it('should update a domain address', async () => {
      const updateDto = { address: 'updated.example.com' };
      const updatedDomainAddress = { ...mockDomainAddress, ...updateDto };
      mockDomainAddressService.update.mockResolvedValue(updatedDomainAddress);

      const result = await controller.update(mockDomainAddress.id, updateDto);

      expect(result).toEqual(updatedDomainAddress);
      expect(mockDomainAddressService.update).toHaveBeenCalledWith(
        mockDomainAddress.id,
        updateDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a domain address', async () => {
      mockDomainAddressService.remove.mockResolvedValue(mockDomainAddress);

      const result = await controller.remove(mockDomainAddress.id);

      expect(result).toEqual(mockDomainAddress);
      expect(mockDomainAddressService.remove).toHaveBeenCalledWith(
        mockDomainAddress.id,
      );
    });
  });
});

