import { Injectable } from '@nestjs/common';
import { CreateKenoDto } from './dto/create-keno.dto';
import { UpdateKenoDto } from './dto/update-keno.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KenoDocument } from './entities/keno.entity'
@Injectable()
export class KenoService {

 constructor(
    @InjectModel('Keno')
    private readonly kenoModel:Model<KenoDocument>

  ){}

  async create(createKenoDto: CreateKenoDto) {
    try {
      const { bets, gameId, tiketId,tiketerId } = createKenoDto;

      const totalPossibleWin = bets.reduce((sum, bet) => sum + bet.possibleWin, 0);


      const newKeno = {
        bets: bets.map(bet => ({
          selectedButtonsS:bet.selectedButtonsS,
          betAmount:bet.betAmount,
          odd:bet.odd,
          possibleWin:bet.possibleWin,
          win: false, // default value
          prize: 0    // default value
        })),
        gameId: Number(gameId),
        TotalPossibleWin: totalPossibleWin,
        canceled: false, // default value
        payd: false,     // default value
        tiketId: tiketId,
        tiketerId: tiketerId
      };

      const newKenoTiket = await this.kenoModel.create(newKeno);
      console.log("createKenoDto:=>", createKenoDto, "\n newKenoTiket: ", newKenoTiket);
      
      return newKenoTiket;
    } catch (error) {
      console.error("Error creating Keno ticket:", error);
      throw error;
    }
  }

  async findAll() {
    const tikets= await this.kenoModel.find()
    return tikets;
  }

  findOne(id: number) {
    return `This action returns a #${id} keno`;
  }

  update(id: number, updateKenoDto: UpdateKenoDto) {
    return `This action updates a #${id} keno`;
  }

  remove(id: number) {
    return `This action removes a #${id} keno`;
  }

  async findByCriteria(
    startDate: Date,
    endDate: Date,
    payd: string,
    canceled: string,
    gameId: string,
    minTotalPrize: number,
  ) {
    const query: any = {};

    if (startDate && endDate) {
      query['createdAt'] = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
      query['createdAt'] = { $gte: startDate };
    } else if (endDate) {
      query['createdAt'] = { $lte: endDate };
    }

    if (payd !== undefined && payd === "true") {
      query['payd'] = payd;
    }

    if (canceled !== undefined && canceled === "true") {
      query['canceled'] = canceled;
    }
    if (gameId) {
      query['gameId'] = gameId;
    }

    if (minTotalPrize !== undefined && minTotalPrize > 0) {
      query['totalPrize'] = { $gt: minTotalPrize };
    }

    return await this.kenoModel.find(query).exec();
  }
}
