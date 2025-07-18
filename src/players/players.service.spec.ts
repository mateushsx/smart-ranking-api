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

    it('should throw an error if player already exists', async () => {
      mockPlayerModel.findOne.mockReturnValueOnce(mockPlayer);

      const sut = service.createPlayer({
        name: mockPlayer.name,
        email: mockPlayer.email,
        phone: mockPlayer.phone,
      });

      await expect(sut).rejects.toThrow('Player already exists');
    });
  });

  describe('getPlayers', () => {
    it('should return an empty array', async () => {
      mockPlayerModel.find.mockReturnValueOnce([]);

      const players = await service.getPlayers();

      expect(mockPlayerModel.find).toHaveBeenCalled();
      expect(players).toEqual([]);
    });

    it('should return an array of players', async () => {
      mockPlayerModel.find.mockReturnValueOnce([mockPlayer]);

      const players = await service.getPlayers();

      expect(mockPlayerModel.find).toHaveBeenCalled();
      expect(players).toEqual([mockPlayer]);
    });
  });

  describe('getPlayer', () => {
    it('should return a player', async () => {
      mockPlayerModel.findById.mockReturnValueOnce(mockPlayer);

      const player = await service.getPlayer(mockPlayer.id);

      expect(mockPlayerModel.findById).toHaveBeenCalledWith(mockPlayer.id);
      expect(player).toEqual(mockPlayer);
    });

    it('should throw an error if player not found', async () => {
      mockPlayerModel.findById.mockReturnValueOnce(null);

      const sut = service.getPlayer(mockPlayer.id);

      await expect(sut).rejects.toThrow('Player not found');
      expect(mockPlayerModel.findById).toHaveBeenCalledWith(mockPlayer.id);
    });

    describe('updatePlayer', () => {
      it('should update a player', async () => {
        mockPlayerModel.findById.mockReturnValueOnce(mockPlayer);
        mockPlayerModel.updateOne.mockReturnValueOnce({});

        await service.updatePlayer(mockPlayer.id, {
          name: mockPlayer.name,
        });

        expect(mockPlayerModel.updateOne).toHaveBeenCalledWith(
          { id: mockPlayer.id },
          { name: mockPlayer.name },
        );
      });

      it('should throw an error if player not found', async () => {
        mockPlayerModel.findById.mockReturnValueOnce(null);

        const sut = service.updatePlayer(mockPlayer.id, {
          name: mockPlayer.name,
        });

        await expect(sut).rejects.toThrow('Player not found');
        expect(mockPlayerModel.findById).toHaveBeenCalledWith(mockPlayer.id);
      });
    });

    describe('deletePlayer', () => {
      it('should delete a player', async () => {
        mockPlayerModel.findById.mockReturnValueOnce(mockPlayer);
        mockPlayerModel.deleteOne.mockReturnValueOnce({});

        await service.deletePlayer(mockPlayer.id);

        expect(mockPlayerModel.deleteOne).toHaveBeenCalledWith({
          id: mockPlayer.id,
        });
      });

      it('should throw an error if player not found', async () => {
        mockPlayerModel.findById.mockReturnValueOnce(null);

        const sut = service.deletePlayer(mockPlayer.id);

        await expect(sut).rejects.toThrow('Player not found');
        expect(mockPlayerModel.findById).toHaveBeenCalledWith(mockPlayer.id);
      });
    });
  });
});
