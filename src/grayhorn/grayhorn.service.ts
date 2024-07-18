import { Injectable } from '@nestjs/common';
import { CreateGrayhornDto } from './dto/create-grayhorn.dto';
import { UpdateGrayhornDto } from './dto/update-grayhorn.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GrayhornDocument } from './entities/grayhorn.entity'

@Injectable()
export class GrayhornService {
  constructor(
    @InjectModel('Grayhorn')
    private readonly grayhornModel:Model<GrayhornDocument>

  ){}
  async create(createGrayhornDto: CreateGrayhornDto) {
    try{
      const newGrayhornTiket= await this.grayhornModel.create(createGrayhornDto)
      return newGrayhornTiket;
    }catch (error){
      console.log("error activating customer")
    }
  }

  async findBayTiketId(id: string) {
    const tiket= await this.grayhornModel.findOne({tiketId:id})

    return tiket;
  }

  async findAll() {
    const allTikets= await this.grayhornModel.find().populate('tiketerId')
    return allTikets;
  }

  async findOne(id:string) {
    const oneTikets= await this.grayhornModel.findById(id)
    return oneTikets;
  }

  async update(updateGrayhornDto: UpdateGrayhornDto) {
    try{
        const tiket= await this.grayhornModel.findOne({tiketId:updateGrayhornDto.tiketId})
        if (tiket.payd === true){
          return " ticket is already paid"
        }else if (tiket.totslPrize > 0){
          tiket.payd = true
          tiket.save()
          return tiket
    }

    return `this tiket have no wining bet in hear`;
    }catch (error){
      console.log("error finding tiket")
    }

  }

  remove(id: string) {
    return `This action removes a #${id} grayhorn`;
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

    
    return await this.grayhornModel.find(query).populate('tiketerId').exec();
  }
}
