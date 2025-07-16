import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { CreatePlayerDTO } from './dtos/create-player.dtos';

const mockPlayersService = {
  getPlayers: jest.fn(),
  getPlayer: jest.fn(),
  createPlayer: jest.fn(),
  updatePlayer: jest.fn(),
  deletePlayer: jest.fn(),
};

const mockCreatePlayerDTO: CreatePlayerDTO = {
  name: 'Test Player',
  email: 'player@example.com',
  phone: '1234567890',
};

describe('PlayersController', () => {
  let controller: PlayersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
        {
          provide: PlayersService,
          useValue: mockPlayersService,
        },
      ],
    }).compile();

    controller = module.get<PlayersController>(PlayersController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPlayer', () => {
    it('should call the createPlayer method', async () => {
      await controller.createPlayer(mockCreatePlayerDTO);

      expect(mockPlayersService.createPlayer).toHaveBeenCalledWith(
        mockCreatePlayerDTO,
      );
    });
  });
});
