// import { Controller, Get, Query, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
// import { SearchService } from './search.service';
// import { GlobalSearchQueryDto } from '../../../common/dto/global-search-query.dto';

// @UseGuards(JwtAuthGuard)
// @Controller('search')
// export class SearchController {
//   constructor(private readonly searchService: SearchService) {}

//   @Get()
//   async search(@Query() queryDto: GlobalSearchQueryDto) {
//     return this.searchService.globalSearch(queryDto.q);
//   }
// }