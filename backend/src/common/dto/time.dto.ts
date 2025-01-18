import { Type } from 'class-transformer';
import { IsArray, IsString, Matches, ValidateNested } from 'class-validator';

export class TimeDto {
  @IsString()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
  startTime: string;
  @IsString()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
  endTime: string;
}
export class weeklyScheduleDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeDto)
  monday: TimeDto[];
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeDto)
  tuesday: TimeDto[];
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeDto)
  wednesday: TimeDto[];
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeDto)
  thursday: TimeDto[];
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeDto)
  friday: TimeDto[];
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeDto)
  saturday: TimeDto[];
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeDto)
  sunday: TimeDto[];
}
