import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dtos';
import { PlayersService } from './players.service';
import { IPlayer } from './interfaces/player.interface';
import { UpdatePlayerDTO } from './dtos/update-player.dtos';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createPlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    await this.playersService.createPlayer(createPlayerDTO);
  }

  @Get()
  async getPlayers(): Promise<IPlayer[]> {
    return this.playersService.getPlayers();
  }

  @Get(':id')
  async getPlayer(@Param('id') id: string): Promise<IPlayer> {
    return this.playersService.getPlayer(id);
  }

  @Put(':id')
  async updatePlayer(
    @Param('id') id: string,
    @Body() updatePlayerDTO: UpdatePlayerDTO,
  ) {
    await this.playersService.updatePlayer(id, updatePlayerDTO);
  }

  @Delete(':id')
  async deletePlayer(@Param('id') id: string) {
    await this.playersService.deletePlayer(id);
  }
}
