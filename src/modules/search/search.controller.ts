import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { SearchService } from './search.service';

import { SearchResultDto } from './dto/search-result.dto';
import { SearchQueryDto } from './dto/search-query.dto';

@ApiTags('Search')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Search across mosque records' })
  async search(@Query() queryDto: SearchQueryDto): Promise<SearchResultDto[]> {
    return this.searchService.globalSearch(queryDto.q ?? '');
  }
}
