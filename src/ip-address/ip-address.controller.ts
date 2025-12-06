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
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { IpAddressService } from './ip-address.service';
import { CreateIpAddressDto, UpdateIpAddressDto, IpAddressWithWebsiteDto } from './dto';

@ApiTags('ip-addresses')
@Controller('ip-addresses')
export class IpAddressController {
  constructor(private readonly ipAddressService: IpAddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create IP address', description: 'Add a new IP address to a website' })
  @ApiResponse({ status: 201, description: 'IP address created successfully', type: IpAddressWithWebsiteDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  create(@Body() createIpAddressDto: CreateIpAddressDto) {
    return this.ipAddressService.create(createIpAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all IP addresses', description: 'Retrieve all IP addresses with their websites' })
  @ApiResponse({ status: 200, description: 'List of IP addresses', type: [IpAddressWithWebsiteDto] })
  findAll() {
    return this.ipAddressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get IP address by ID', description: 'Retrieve an IP address by its ID' })
  @ApiParam({ name: 'id', description: 'IP address UUID' })
  @ApiResponse({ status: 200, description: 'IP address found', type: IpAddressWithWebsiteDto })
  @ApiResponse({ status: 404, description: 'IP address not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ipAddressService.findOne(id);
  }

  @Get('website/:websiteId')
  @ApiOperation({ summary: 'Get IP addresses by website', description: 'Retrieve all IP addresses for a specific website' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID' })
  @ApiResponse({ status: 200, description: 'List of IP addresses for the website', type: [IpAddressWithWebsiteDto] })
  findByWebsiteId(@Param('websiteId', ParseUUIDPipe) websiteId: string) {
    return this.ipAddressService.findByWebsiteId(websiteId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update IP address', description: 'Update an IP address' })
  @ApiParam({ name: 'id', description: 'IP address UUID' })
  @ApiResponse({ status: 200, description: 'IP address updated successfully', type: IpAddressWithWebsiteDto })
  @ApiResponse({ status: 404, description: 'IP address not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateIpAddressDto: UpdateIpAddressDto,
  ) {
    return this.ipAddressService.update(id, updateIpAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete IP address', description: 'Delete an IP address' })
  @ApiParam({ name: 'id', description: 'IP address UUID' })
  @ApiResponse({ status: 200, description: 'IP address deleted successfully', type: IpAddressWithWebsiteDto })
  @ApiResponse({ status: 404, description: 'IP address not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ipAddressService.remove(id);
  }
}

