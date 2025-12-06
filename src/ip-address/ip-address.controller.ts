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
import { IpAddressService } from './ip-address.service';
import { CreateIpAddressDto, UpdateIpAddressDto } from './dto';

@Controller('ip-addresses')
export class IpAddressController {
  constructor(private readonly ipAddressService: IpAddressService) {}

  @Post()
  create(@Body() createIpAddressDto: CreateIpAddressDto) {
    return this.ipAddressService.create(createIpAddressDto);
  }

  @Get()
  findAll() {
    return this.ipAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ipAddressService.findOne(id);
  }

  @Get('website/:websiteId')
  findByWebsiteId(@Param('websiteId', ParseUUIDPipe) websiteId: string) {
    return this.ipAddressService.findByWebsiteId(websiteId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateIpAddressDto: UpdateIpAddressDto,
  ) {
    return this.ipAddressService.update(id, updateIpAddressDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ipAddressService.remove(id);
  }
}

