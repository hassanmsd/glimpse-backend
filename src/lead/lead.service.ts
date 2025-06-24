import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

import { Lead } from './entities/lead.entity';

import { FindAll } from 'types/global';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead) private readonly leadRepository: Repository<Lead>,
  ) {}

  createInBulk(createLeadDto: CreateLeadDto[]) {
    // Prepare entity instances from raw DTO input
    const lead = this.leadRepository.create(createLeadDto);

    // save all lead records to the database
    return this.leadRepository.save(lead);
  }

  // Fetch paginated and filtered leads from the database
  async findAll({
    limit,
    offset,
    source,
    interestLevel,
    status,
    userId,
  }: FindAll) {
    const where: any = {};

    // Apply optional filters to the query
    if (source) where.source = source;
    if (interestLevel) where.interestLevel = interestLevel;
    if (status) where.status = status;
    if (userId) where.userId = userId;

    // Execute paginated query with filters and total count
    const [data, total] = await this.leadRepository.findAndCount({
      where,
      take: limit,
      skip: offset,
      order: { leadID: 'DESC' },
    });

    // Return both data and total count for pagination
    return { data, total };
  }

  //THE FOLLOWING CONTROLLERS ARE CURRENTLY NOT USED IN THIS PROJECT.
  async create(createLeadDto: CreateLeadDto) {
    const lead = this.leadRepository.create(createLeadDto);
    return this.leadRepository.save(lead);
  }

  findOne(id: number) {
    return this.leadRepository.findOneBy({ leadID: id });
  }

  async update(id: number, updateLeadDto: UpdateLeadDto) {
    await this.leadRepository.update(id, updateLeadDto);
    return this.leadRepository.findOneBy({ leadID: id });
  }

  async remove(id: number) {
    const lead = await this.leadRepository.findOneBy({ leadID: id });

    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    await this.leadRepository.remove(lead);
    return { message: `Lead with ID ${id} has been removed successfully` };
  }
}
