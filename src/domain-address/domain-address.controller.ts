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
import { DomainAddressService } from './domain-address.service';
import { CreateDomainAddressDto, UpdateDomainAddressDto, DomainAddressWithWebsiteDto } from './dto';

@ApiTags('domain-addresses')
@Controller('domain-addresses')
export class DomainAddressController {
  constructor(private readonly domainAddressService: DomainAddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create domain address', description: 'Add a new domain address to a website' })
  @ApiResponse({ status: 201, description: 'Domain address created successfully', type: DomainAddressWithWebsiteDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Website not found' })
  create(@Body() createDomainAddressDto: CreateDomainAddressDto) {
    return this.domainAddressService.create(createDomainAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all domain addresses', description: 'Retrieve all domain addresses with their websites' })
  @ApiResponse({ status: 200, description: 'List of domain addresses', type: [DomainAddressWithWebsiteDto] })
  findAll() {
    return this.domainAddressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get domain address by ID', description: 'Retrieve a domain address by its ID' })
  @ApiParam({ name: 'id', description: 'Domain address UUID' })
  @ApiResponse({ status: 200, description: 'Domain address found', type: DomainAddressWithWebsiteDto })
  @ApiResponse({ status: 404, description: 'Domain address not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.domainAddressService.findOne(id);
  }

  @Get('website/:websiteId')
  @ApiOperation({ summary: 'Get domain addresses by website', description: 'Retrieve all domain addresses for a specific website' })
  @ApiParam({ name: 'websiteId', description: 'Website UUID' })
  @ApiResponse({ status: 200, description: 'List of domain addresses for the website', type: [DomainAddressWithWebsiteDto] })
  findByWebsiteId(@Param('websiteId', ParseUUIDPipe) websiteId: string) {
    return this.domainAddressService.findByWebsiteId(websiteId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update domain address', description: 'Update a domain address' })
  @ApiParam({ name: 'id', description: 'Domain address UUID' })
  @ApiResponse({ status: 200, description: 'Domain address updated successfully', type: DomainAddressWithWebsiteDto })
  @ApiResponse({ status: 404, description: 'Domain address not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDomainAddressDto: UpdateDomainAddressDto,
  ) {
    return this.domainAddressService.update(id, updateDomainAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete domain address', description: 'Delete a domain address' })
  @ApiParam({ name: 'id', description: 'Domain address UUID' })
  @ApiResponse({ status: 200, description: 'Domain address deleted successfully', type: DomainAddressWithWebsiteDto })
  @ApiResponse({ status: 404, description: 'Domain address not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.domainAddressService.remove(id);
  }
}

