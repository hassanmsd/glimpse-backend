import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

import { INTEREST_LEVEL, SALE_STATUS, SOURCE } from 'types/global';

@Entity()
export class Lead {
  // Unique primary key for each lead record (custom lead ID)
  @PrimaryColumn({ type: 'varchar', length: 30, unique: true })
  leadID: number;

  // Name of the lead
  @Column({ type: 'varchar' })
  leadName: string;

  // Contact email of the lead
  @Column({ type: 'varchar' })
  @IsEmail()
  contactInformation: string;

  // Source from which the lead came (e.g., Website, Referral, etc.)
  @Column({ type: 'enum', enum: SOURCE })
  source: SOURCE;

  // Lead's level of interest
  @Column({ type: 'enum', enum: INTEREST_LEVEL })
  interestLevel: INTEREST_LEVEL;

  // Status of the lead
  @Column({ type: 'enum', enum: SALE_STATUS })
  status: SALE_STATUS;

  // Name of the salesperson assigned to the lead
  @Column({ type: 'varchar' })
  assignedSalesperson: string;

  // ID of the user (owner) who created or owns this lead
  @Column({ type: 'varchar' })
  userId: string;
}
