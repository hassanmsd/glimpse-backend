import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import { INTEREST_LEVEL, SALE_STATUS, SOURCE } from 'types/global';

export class CreateLeadDto {
  @IsNumber()
  @IsNotEmpty()
  leadID: number;

  @IsString()
  @IsNotEmpty()
  leadName: string;

  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Please provide valid Email.' })
  contactInformation: string;

  @IsEnum(SOURCE)
  source: SOURCE;

  @IsEnum(INTEREST_LEVEL)
  interestLevel: INTEREST_LEVEL;

  @IsEnum(SALE_STATUS)
  status: SALE_STATUS;

  @IsString()
  @IsNotEmpty()
  assignedSalesperson: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
