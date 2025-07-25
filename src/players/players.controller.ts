import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dtos';
import { PlayersService } from './players.service';
import { IPlayer } from './interfaces/player.interface';
import { UpdatePlayerDTO } from './dtos/update-player.dtos';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    await this.playersService.createPlayer(createPlayerDTO);
  }

  @Get()
  async getPlayers(): Promise<IPlayer[]> {
    return this.playersService.getPlayers();
  }

  @Get(':id')
  async getPlayer(@Param('id', ParseUUIDPipe) id: string): Promise<IPlayer> {
    return this.playersService.getPlayer(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePlayerDTO: UpdatePlayerDTO,
  ) {
    await this.playersService.updatePlayer(id, updatePlayerDTO);
  }

  @Delete(':id')
  async deletePlayer(@Param('id', ParseUUIDPipe) id: string) {
    await this.playersService.deletePlayer(id);
  }
}
