import { Injectable } from '@nestjs/common';
import { CreateAnimeHorDto } from './dto/create-anime-hor.dto';
import { UpdateAnimeHorDto } from './dto/update-anime-hor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnimeHorDocument, AnimeHor } from './entities/anime-hor.entity'
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

@Injectable()
export class AnimeHorsService {
  constructor(
    @InjectModel('AnimeHor')
    private readonly AnimeHorModel:Model<AnimeHorDocument>

  ){}
  async create(createAnimeHorDto: CreateAnimeHorDto) {

    try {
      const createAnimeHorObj = plainToInstance(CreateAnimeHorDto, createAnimeHorDto);

      await validateOrReject(createAnimeHorObj);

      const newAnimeHorData: Partial<AnimeHor> = {
        ...createAnimeHorDto,
        canceled: false, 
        payd: false, 
        totslPrize: 0,
        bets: createAnimeHorDto.bets.map(bet => ({
          ...bet,
          win: false, 
          prize: 0 
        })),
      };

      const newAnimeHorTiket = await this.AnimeHorModel.create(newAnimeHorData);
      return newAnimeHorTiket;
    } catch (error) {
      console.error("Error creating AnimeHor ticket:", error);
      throw error; 
    }
  }

  async findAll() {
    const allTikets= await this.AnimeHorModel.find().populate('tiketerId')
    return allTikets;
  }

  async findOne(id: string) {
    const tiket = await this.AnimeHorModel.findById(id)
    return tiket;
  }

  async findBayTiketId(id: string) {
    const tiket= await this.AnimeHorModel.findOne({tiketId:id})

    return tiket;
  }
  async update( updateAnimeHorDto: UpdateAnimeHorDto) {
    try{
      const tiket= await this.AnimeHorModel.findOne({tiketId:updateAnimeHorDto.tiketId})
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

  remove(id: number) {
    return `This action removes a #${id} animeHor`;
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

    return await this.AnimeHorModel.find(query).populate('tiketerId').exec();
  }
}
