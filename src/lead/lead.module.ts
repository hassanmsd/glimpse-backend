import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Lead } from './entities/lead.entity';

import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
  controllers: [LeadController],
  providers: [LeadService],
})
export class LeadModule {}
