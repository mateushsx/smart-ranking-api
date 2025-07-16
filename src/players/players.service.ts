import { Model } from 'mongoose';
import { randomUUID } from 'node:crypto';

import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePlayerDTO } from './dtos/create-player.dtos';
import { UpdatePlayerDTO } from './dtos/update-player.dtos';
import { IPlayer } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  public constructor(
    @InjectModel('Player') private readonly playerModel: Model<IPlayer>,
  ) {}

  public async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    this.logger.log(`[CREATE PLAYER] ${createPlayerDTO.name}`);

    const playerExists = await this.playerModel.findOne({
      email: createPlayerDTO.email,
    });

    if (playerExists) {
      throw new BadRequestException('Player already exists');
    }

    const player: IPlayer = {
      id: randomUUID(),
      ranking: 'A',
      rankingPosition: 1,
      photoUrl: '',
      ...createPlayerDTO,
    };

    await this.playerModel.create(player);
  }

  public async getPlayers(): Promise<IPlayer[]> {
    this.logger.log('[GET PLAYERS]');

    return await this.playerModel.find();
  }

  public async getPlayer(id: string): Promise<IPlayer> {
    this.logger.log(`[GET PLAYER] ${id}`);

    const player = await this.playerModel.findById(id);

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return player;
  }

  public async updatePlayer(id: string, data: UpdatePlayerDTO) {
    this.logger.log(`[UPDATE PLAYER] ${id}`);

    const player = await this.playerModel.findById(id);

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    await this.playerModel.updateOne({ id: id }, data);
  }

  public async deletePlayer(id: string) {
    this.logger.log(`[DELETE PLAYER] ${id}`);

    const player = await this.playerModel.findById(id);

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    await this.playerModel.deleteOne({ id: id });
  }
}
