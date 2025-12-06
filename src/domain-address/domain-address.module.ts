import { Module } from '@nestjs/common';
import { DomainAddressService } from './domain-address.service';
import { DomainAddressController } from './domain-address.controller';

@Module({
  controllers: [DomainAddressController],
  providers: [DomainAddressService],
  exports: [DomainAddressService],
})
export class DomainAddressModule {}

