import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.Interceptor';
import { MentorService } from './mentor.service';
import { MentorRequestDto } from './dto/mentor.request.dto';
import { User } from 'src/common/decorators/user.decorator';
import { LoggedInGuard } from 'src/auth/logged-in.guard';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('멘토')
@Controller('Mentor')
export class MentorController {
  constructor(private readonly MentorService: MentorService) {}
  @ApiResponse({
    status: 201,
    description: '멘토신청이 완료되었습니다.',
    type: MentorRequestDto,
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
  async MentorApplication(@Body() body: MentorRequestDto, @User() user) {
    return await this.MentorService.MentorApplication(
      user.id,
      body.email,
      body.job,
      body.introduce,
      body.portfolio,
      body.career,
    );
  }
}
