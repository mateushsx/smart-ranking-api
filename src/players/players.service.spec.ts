import { getModelToken } from '@nestjs/mongoose';
import { PlayersService } from './players.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { IPlayer } from './interfaces/player.interface';

const mockPlayer: IPlayer = {
  id: 'random-uuid',
  name: 'Test Player',
  email: 'player@example.com',
  phone: '1234567890',
  photoUrl: '',
  ranking: 'A',
  rankingPosition: 1,
};

const mockPlayerModel = {
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
  findOne: jest.fn(),
};

jest.mock('node:crypto', () => ({
  randomUUID: () => 'random-uuid',
}));

describe('PlayersService', () => {
  let service: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getModelToken('Player'),
          useValue: mockPlayerModel,
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPlayer', () => {
    it('should create a player', async () => {
      mockPlayerModel.create.mockReturnValueOnce({});

      await service.createPlayer({
        name: mockPlayer.name,
        email: mockPlayer.email,
        phone: mockPlayer.phone,
      });

      expect(mockPlayerModel.create).toHaveBeenCalledWith(mockPlayer);
    });
  });
});
