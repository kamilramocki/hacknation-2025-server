import { PartialType } from '@nestjs/mapped-types';
import { CreateIpAddressDto } from './create-ip-address.dto';

export class UpdateIpAddressDto extends PartialType(CreateIpAddressDto) {}

