import { Injectable } from '@nestjs/common';
import { CreateKenoRsultDto } from './dto/create-keno-rsult.dto';
import { UpdateKenoRsultDto } from './dto/update-keno-rsult.dto';
import { KenoRaceDocument } from './entities/keno-rsult.entity'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Keno } from 'src/keno/entities/keno.entity'
@Injectable()
export class KenoRsultService {
  constructor(
    @InjectModel('KenoRsult')
    private readonly kenoRaceModel: Model<KenoRaceDocument>,
    @InjectModel('Keno')
    private readonly kenoTiketModel: Model<Keno>

  ) {}
  async create(createKenoRsultDto: CreateKenoRsultDto) {
    // try{
    //   const { gameId, First, Second } = createKenoRsultDto
    //   const createKenoTiket= new this.kenoRaceModel(createKenoRsultDto)
    //   await createKenoTiket.save()

    //   const tickets= await this.kenoTiketModel.find({gameId:createKenoRsultDto.gameId})
    //   for (const ticket of tickets) {
    //     let totalPrize = 0;

    //     ticket.bets.forEach(bet => {
    //       if(bet.selectedButtonsS[0] === 1){
    //         if (bet.selectedButtonsS[1] === First.DogPlaceNum) {
    //           bet.win = true;
    //           bet.prize = First.DogPlaceOdd * bet.betAmount;
    //           totalPrize += bet.prize;
    //       console.log("First winder dog: ",ticket.bets)
              
    //         }
    //          else {
    //           bet.win = false;
    //           bet.prize = 0;
    //         }
    //       }else if (bet.selectedButtonsS[0] === 2){
    //         if(bet.selectedButtonsS[1] === Second.DogPlaceNum){
    //           bet.win = true;
    //           bet.prize = Second.DogPlaceOdd * bet.betAmount;
    //           totalPrize += bet.prize;
    //       console.log("Second winder dog: ",ticket.bets)
    //         }
    //          else {
    //           bet.win = false;
    //           bet.prize = 0;
    //         }
    //       }else{
    //         console.log("the tiket is not valide")
    //       }
          
    //     });

    //     ticket.totslPrize = totalPrize;
    //     await ticket.save();
    //   }
    // }catch (error) {
    //   console.log('Error creating result:', error);
    //   throw error;
    // }
    return 'This action adds a new kenoRsult';
  }

  findAll() {
    return `This action returns all kenoRsult`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kenoRsult`;
  }

  update(id: number, updateKenoRsultDto: UpdateKenoRsultDto) {
    return `This action updates a #${id} kenoRsult`;
  }

  remove(id: number) {
    return `This action removes a #${id} kenoRsult`;
  }
}
