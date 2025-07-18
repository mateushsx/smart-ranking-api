import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { CreatePlayerDTO } from './dtos/create-player.dtos';
import { UpdatePlayerDTO } from './dtos/update-player.dtos';

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

const mockUpdatePlayerDTO: UpdatePlayerDTO = {
  name: 'Updated name',
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

  describe('getPlayers', () => {
    it('should call the getPlayers method', async () => {
      await controller.getPlayers();

      expect(mockPlayersService.getPlayers).toHaveBeenCalled();
    });
  });

  describe('getPlayer', () => {
    it('should call the getPlayer method', async () => {
      await controller.getPlayer('unique-id');

      expect(mockPlayersService.getPlayer).toHaveBeenCalledWith('unique-id');
    });
  });

  describe('updatePlayer', () => {
    it('should call the updatePlayer method', async () => {
      await controller.updatePlayer('unique-id', mockUpdatePlayerDTO);

      expect(mockPlayersService.updatePlayer).toHaveBeenCalledWith(
        'unique-id',
        mockUpdatePlayerDTO,
      );
    });
  });

  describe('deletePlayer', () => {
    it('should call the deletePlayer method', async () => {
      await controller.deletePlayer('unique-id');

      expect(mockPlayersService.deletePlayer).toHaveBeenCalledWith('unique-id');
    });
  });
});
