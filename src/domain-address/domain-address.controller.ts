import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DomainAddressService } from './domain-address.service';
import { CreateDomainAddressDto, UpdateDomainAddressDto } from './dto';

@Controller('domain-addresses')
export class DomainAddressController {
  constructor(private readonly domainAddressService: DomainAddressService) {}

  @Post()
  create(@Body() createDomainAddressDto: CreateDomainAddressDto) {
    return this.domainAddressService.create(createDomainAddressDto);
  }

  @Get()
  findAll() {
    return this.domainAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.domainAddressService.findOne(id);
  }

  @Get('website/:websiteId')
  findByWebsiteId(@Param('websiteId', ParseUUIDPipe) websiteId: string) {
    return this.domainAddressService.findByWebsiteId(websiteId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDomainAddressDto: UpdateDomainAddressDto,
  ) {
    return this.domainAddressService.update(id, updateDomainAddressDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.domainAddressService.remove(id);
  }
}

