import { PartialType } from '@nestjs/mapped-types';
import { CreateDomainAddressDto } from './create-domain-address.dto';

export class UpdateDomainAddressDto extends PartialType(CreateDomainAddressDto) {}

