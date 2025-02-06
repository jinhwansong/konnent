import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.Interceptor';
import { ProgramsService } from './programs.service';
import { ProgramRequestDto, UserListDto } from 'src/common/dto/search.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('유저 프로그램')
@Controller('programs')
export class ProgramsController {
  constructor(private readonly ProgramService: ProgramsService) {}
  @ApiResponse({
    status: 200,
    description: '모든 프로그램을 불러옵니다.',
    type: UserListDto,
  })
  @ApiOperation({ summary: '프로그램 불러오기' })
  @Get('')
  get(@Query() query: ProgramRequestDto) {
    return this.ProgramService.get(query);
  }
}
