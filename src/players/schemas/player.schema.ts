import { Schema } from 'mongoose';
import { IPlayer } from '../interfaces/player.interface';

export const PlayerSchema = new Schema<IPlayer>(
  {
    id: String,
    name: String,
    email: String,
    phone: String,
    ranking: String,
    rankingPosition: Number,
    photoUrl: String,
  },
  { timestamps: true, collection: 'players' },
);
