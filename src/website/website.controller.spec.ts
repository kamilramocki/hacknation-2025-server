import { Test, TestingModule } from '@nestjs/testing';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';

describe('WebsiteController', () => {
  let controller: WebsiteController;
  let service: WebsiteService;

  const mockWebsite = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test Website',
    createdAt: new Date(),
    updatedAt: new Date(),
    domainAddresses: [],
    ipAddresses: [],
  };

  const mockWebsiteService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebsiteController],
      providers: [
        {
          provide: WebsiteService,
          useValue: mockWebsiteService,
        },
      ],
    }).compile();

    controller = module.get<WebsiteController>(WebsiteController);
    service = module.get<WebsiteService>(WebsiteService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a website', async () => {
      const createDto = { name: 'Test Website' };
      mockWebsiteService.create.mockResolvedValue(mockWebsite);

      const result = await controller.create(createDto);

      expect(result).toEqual(mockWebsite);
      expect(mockWebsiteService.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of websites', async () => {
      mockWebsiteService.findAll.mockResolvedValue([mockWebsite]);

      const result = await controller.findAll();

      expect(result).toEqual([mockWebsite]);
      expect(mockWebsiteService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a website by id', async () => {
      mockWebsiteService.findOne.mockResolvedValue(mockWebsite);

      const result = await controller.findOne(mockWebsite.id);

      expect(result).toEqual(mockWebsite);
      expect(mockWebsiteService.findOne).toHaveBeenCalledWith(mockWebsite.id);
    });
  });

  describe('update', () => {
    it('should update a website', async () => {
      const updateDto = { name: 'Updated Website' };
      const updatedWebsite = { ...mockWebsite, ...updateDto };
      mockWebsiteService.update.mockResolvedValue(updatedWebsite);

      const result = await controller.update(mockWebsite.id, updateDto);

      expect(result).toEqual(updatedWebsite);
      expect(mockWebsiteService.update).toHaveBeenCalledWith(
        mockWebsite.id,
        updateDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a website', async () => {
      mockWebsiteService.remove.mockResolvedValue(mockWebsite);

      const result = await controller.remove(mockWebsite.id);

      expect(result).toEqual(mockWebsite);
      expect(mockWebsiteService.remove).toHaveBeenCalledWith(mockWebsite.id);
    });
  });
});

