import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadService } from './lead.service';

// Base route for all lead-related endpoints
@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  // Create a single lead entry
  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto);
  }

  // Create multiple leads in bulk
  @Post('/bulk')
  createInBulk(@Body() createLeadDto: CreateLeadDto[]) {
    return this.leadService.createInBulk(createLeadDto);
  }

  // Retrieve leads with optional filters and pagination
  @Get()
  findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('source') source?: string,
    @Query('interestLevel') interestLevel?: string,
    @Query('status') status?: string,
    @Query('userId') userId?: string,
  ) {
    return this.leadService.findAll({
      limit: parseInt(limit ?? '15'),
      offset: parseInt(offset ?? '0'),
      source,
      interestLevel,
      status,
      userId,
    });
  }

  // Retrieve a single lead by its ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(+id);
  }

  // Update a lead by its ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadService.update(+id, updateLeadDto);
  }

  // Delete a lead by its ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadService.remove(+id);
  }
}
