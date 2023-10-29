import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDataResponseDto } from './dto/user-data.dto';
import { UserDataService } from './user-data.service';

@ApiTags('Get user data')
@Controller('api/data')
export class UserDataController {
  constructor(private readonly userDataService: UserDataService) {}

  // Get user data by id
  @ApiOperation({ summary: 'Get user data by id' })
  @ApiResponse({ status: 200, type: UserDataResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Get('profile/:id')
  public async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userDataService.getUserById(id);
  }
}
