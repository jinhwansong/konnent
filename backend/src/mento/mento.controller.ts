import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.Interceptor';
import { MentoService } from './mento.service';
import { MentoApprovalDto, MentoRequsetDto } from './dto/mento.requset.dto';
import { User } from 'src/common/decorators/user.decorator';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { PaginationDto } from 'src/common/dto/page.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('멘토')
@Controller('mento')
export class MentoController {
  constructor(private mentoService: MentoService) {}
  @ApiResponse({
    status: 201,
    description: '멘토신청이 완료되었습니다.',
    type: MentoRequsetDto,
    schema: {
      properties: {
        message: { type: 'string', example: '멘토신청이 완료되었습니다.' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '이미 멘토신청을 완료했습니다.',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: '이미 멘토신청을 완료했습니다.' },
      },
    },
  })
  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '멘토 신청' })
  @Post()
  async mentorApplication(@Body() body: MentoRequsetDto, @User() user) {
    return await this.mentoService.mentorApplication(
      user.id,
      body.email,
      body.job,
      body.introduce,
      body.portfolio,
      body.career,
    );
  }

  @ApiResponse({
    status: 201,
    description: '멘토 승인이 완료되었습니다.',
    schema: {
      properties: {
        message: {
          type: 'string',
          example: '멘토 승인이 완료되었습니다.',
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: '멘토 승인 처리 중 오류가 발생했습니다.',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'string',
          example: '멘토 승인 처리 중 오류가 발생했습니다.',
        },
      },
    },
  })
  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '멘토 승인/거절' })
  @Post('approve/:id')
  async approveMentor(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: MentoApprovalDto,
  ) {
    return await this.mentoService.approveMentor(
      id,
      body.approved,
      body.reason,
    );
  }
  @ApiResponse({
    status: 201,
    description: '멘토 신청 목록 조회 성공',
    type: MentoRequsetDto,
  })
  @ApiResponse({
    status: 500,
    description: '멘토 신청 목록 조회 실패',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'string',
          example: '멘토 신청 목록 조회 실패',
        },
      },
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '멘토 신청 목록 조회' })
  @Get('applications')
  async getApplications(@Query() { page, limit }: PaginationDto) {
    return await this.mentoService.getApplications(page, limit);
  }

  @ApiResponse({
    status: 201,
    description: '멘토 신청 상세 조회 성공',
    type: MentoRequsetDto,
  })
  @ApiResponse({
    status: 404,
    description: '멘토 신청 정보를 찾을 수 없습니다.',
  })
  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '멘토 신청 상세 조회' })
  @Get('applications/:id')
  async getApplicationsDetail(@Param('id', ParseIntPipe) id: number) {
    return await this.mentoService.findOneApplicationDetail(id);
  }
}
