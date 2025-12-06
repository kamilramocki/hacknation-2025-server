export class PrismaClient {
  constructor(_options?: any) {}

  $connect = jest.fn();
  $disconnect = jest.fn();

  website = {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  domainAddress = {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  iPAddress = {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
}

export const PrismaPg = jest.fn();
export const Pool = jest.fn();

