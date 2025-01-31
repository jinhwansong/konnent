import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  MentoingProgramCreateDto,
  MentoingProgramDto,
} from 'src/program/dto/program.request.dto';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';
import { PaginationDto } from 'src/common/dto/page.dto';
import { ProgramListDto, SearchDto } from 'src/common/dto/search.dto';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.Interceptor';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('멘토 프로그램')
@Controller('program')
export class ProgramController {
  constructor(private readonly ProgramService: ProgramService) {}
  @ApiResponse({
    status: 200,
    description: '멘토님의 프로그램이 등록되었습니다.',
    type: MentoingProgramDto,
  })
  @ApiResponse({
    status: 500,
    description: '멘토님의 프로그램 등록 중 오류가 발생했습니다.',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: {
          type: 'string',
          example: '멘토님의 프로그램 등록 중 오류가 발생했습니다.',
        },
      },
    },
  })
  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '멘토 프로그램등록' })
  @Post('')
  create(@Body() body: MentoingProgramCreateDto, @User() user) {
    return this.ProgramService.create(body, user.id);
  }
  @ApiResponse({
    status: 200,
    description: '멘토님의 프로그램이 수정되었습니다.',
    type: MentoingProgramDto,
  })
  @ApiResponse({
    status: 500,
    description: '멘토님의 프로그램 수정 중 오류가 발생했습니다.',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: {
          type: 'string',
          example: '멘토님의 프로그램 수정 중 오류가 발생했습니다.',
        },
      },
    },
  })
  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '멘토 프로그램 수정' })
  @Patch(':id')
  update(
    @Body() body: MentoingProgramCreateDto,
    @User() user,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.ProgramService.update(body, user.id, id);
  }
  @ApiResponse({
    status: 200,
    description: '멘토님의 프로그램이 삭제되었습니다.',
  })
  @ApiResponse({
    status: 500,
    description: '멘토님의 프로그램 삭제 중 오류가 발생했습니다.',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: {
          type: 'string',
          example: '멘토님의 프로그램 삭제 중 오류가 발생했습니다.',
        },
      },
    },
  })
  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '멘토 프로그램 삭제' })
  @Delete(':id')
  deleteProgram(@User() user, @Param('id', ParseIntPipe) id: number) {
    return this.ProgramService.delete(user.id, id);
  }
  @ApiResponse({
    status: 200,
    description: '멘토님의 프로그램이 조회되었습니다.',
    type: ProgramListDto,
  })
  @ApiResponse({
    status: 500,
    description: '멘토님의 프로그램 조회 중 오류가 발생했습니다.',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: {
          type: 'string',
          example: '멘토님의 프로그램 조회 중 오류가 발생했습니다.',
        },
      },
    },
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '멘토 프로그램 조회' })
  @Get('')
  get(@User() user, @Query() paginationDto: PaginationDto) {
    return this.ProgramService.get(user.id, paginationDto);
  }
  @ApiResponse({
    status: 200,
    description: '멘토님의 프로그램이 조회되었습니다.',
    type: ProgramListDto,
  })
  @ApiResponse({
    status: 500,
    description: '멘토님의 프로그램 조회 중 오류가 발생했습니다.',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: {
          type: 'string',
          example: '멘토님의 프로그램 조회 중 오류가 발생했습니다.',
        },
      },
    },
  })
  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '멘토 프로그램 상세조회' })
  @Get(':id')
  detail(@User() user, @Param('id', ParseIntPipe) id: number) {
    return this.ProgramService.detail(user.id, id);
  }
  @ApiResponse({
    status: 200,
    description: '멘토님의 프로그램을 검색 하였습니다.',
    type: ProgramListDto,
  })
  @ApiResponse({
    status: 500,
    description: '멘토님의 프로그램을 검색 중 오류가 발생했습니다.',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: {
          type: 'string',
          example: '멘토님의 프로그램을 검색 중 오류가 발생했습니다.',
        },
      },
    },
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'keyword', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '멘토 프로그램 검색' })
  @Get('search')
  search(@User() user, @Query() searchDto: SearchDto) {
    return this.ProgramService.search(user.id, searchDto);
  }
}
