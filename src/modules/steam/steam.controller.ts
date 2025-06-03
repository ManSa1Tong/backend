import { Controller, Get } from '@nestjs/common';
import { SteamService } from './steam.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('steam')
@Controller('steam')
export class SteamController {
  constructor(private readonly steamService: SteamService) {}

  @Get('upcoming')
  getUpcomingGames() {
    return this.steamService.getUpcomingGames();
  }
}
