import { Injectable } from '@nestjs/common';
import { CreateAnimeDogDto } from './dto/create-anime-dog.dto';
import { UpdateAnimeDogDto } from './dto/update-anime-dog.dto';
import { AnimeDogDocument,AnimeDog } from './entities/anime-dog.entity'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
@Injectable()
export class AnimeDogService {
  constructor(
    @InjectModel('AnimeDog')
    private readonly animeDogModel:Model<AnimeDogDocument>

  ){}

  async create(createAnimeDogDto: CreateAnimeDogDto) {
    try{
      const createAnimeHorObj = plainToInstance(CreateAnimeDogDto, createAnimeDogDto);

      // Validate the DTO instance
      await validateOrReject(createAnimeHorObj);

      const newAnimeHorData: Partial<AnimeDog> = {
        ...createAnimeDogDto,
        canceled: false, 
        payd: false, 
        totslPrize: 0, 
        bets: createAnimeDogDto.bets.map(bet => ({
          ...bet,
          win: false, 
          prize: 0 
        })),
      };
      const newAnimedogTiket= await this.animeDogModel.create(newAnimeHorData)
      return newAnimedogTiket;
    }catch (error){
      console.log("error activating customer")
    }
  }

  async findAll() {
    const allTikets= await this.animeDogModel.find().populate('tiketerId')
    return allTikets;
  }

  async findOne(id: string) {
    const tiket= await this.animeDogModel.findById(id)

    return tiket;
  }

  async findBayTiketId(id: string) {
    const tiket= await this.animeDogModel.findOne({tiketId:id})

    return tiket;
  }

  async update(updateAnimeDogDto: UpdateAnimeDogDto) {
    try{
      const tiket= await this.animeDogModel.findOne({tiketId:updateAnimeDogDto.tiketId})
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

  async remove(id: number) {
    return `This action removes a #${id} animeDog`;
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

    return await this.animeDogModel.find(query).populate('tiketerId').exec();
  }
}
