import { Injectable } from '@nestjs/common';
import { CreateGrayhornResulatDto } from './dto/create-grayhorn-resulat.dto';
import { UpdateGrayhornResulatDto } from './dto/update-grayhorn-resulat.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import { GameResultDocument } from './entities/grayhorn-resulat.entity'
import { GrayhornDocument } from 'src/grayhorn/entities/grayhorn.entity'

@Injectable()
export class GrayhornResulatService {

  constructor(
    @InjectModel('GrayhornResulat')
    private readonly grayhornResulatModel: Model<GameResultDocument>,
    @InjectModel('Grayhorn')
    private readonly grayhornTiketModel:Model<GrayhornDocument>
    
  ) {}
  async create(createGrayhornResulatDto: CreateGrayhornResulatDto) {
    // Save the result
    const createdResult = new this.grayhornResulatModel(createGrayhornResulatDto);
    await createdResult.save();

    // Find all tickets for the game
    const tickets = await this.grayhornTiketModel.find({ gameId: createGrayhornResulatDto.gameId });

    // Determine the winners and update the tickets
    const { resalt, windOdd, qunelaOdd, exactOdd, tryfectaOdd } = createGrayhornResulatDto;
    const winners = [];

    for (const ticket of tickets) {
      let totalPrize = 0;
      let isWinner = false;

      for (const bet of ticket.bets) {
        let betPrize = 0;

        if (this.isTryfectaWinner(bet.selectedButtons, resalt)) {
          betPrize += bet.betAmount * tryfectaOdd;
          bet.win = true;
          isWinner = true;
        }
        if (bet.isQuinellaActive && this.isQuinellaWinner(bet.selectedButtons, resalt)) {
          betPrize += bet.betAmount * qunelaOdd;
          bet.win = true;
          isWinner = true;
        }
        if (bet.isExactaActive && this.isExactaWinner(bet.selectedButtons, resalt)) {
          betPrize += bet.betAmount * exactOdd;
          bet.win = true;
          isWinner = true;
        }
        if (this.isWinWinner(bet.selectedButtons, resalt)) {
          betPrize += bet.betAmount * windOdd;
          bet.win = true;
          isWinner = true;
        }

        if (bet.win) {
          bet.prize = betPrize;
          totalPrize += betPrize;
        }
        
      }

      if (isWinner) {
        ticket.totslPrize = totalPrize;
        console.log("ticket: ",ticket)

        await ticket.save();
        winners.push(ticket);
        console.log("winners: ",winners)

      }
    }


    return winners;
  }

  private isTryfectaWinner(selectedButtons: number[][], resalt: { first: number, second: number, third: number }): boolean {
    var boolean= false
    if(selectedButtons.length === 3 && selectedButtons[0][1]=== resalt.first && 
      selectedButtons[1] [1]=== resalt.second && 
      selectedButtons[2] [1] === resalt.third){
        boolean= true
      }
 
    return boolean
  }

  private isQuinellaWinner(selectedButtons: number[][], resalt: { first: number, second: number, third: number }): boolean {
    var boolean= false
    if(selectedButtons.length === 2 && ((selectedButtons[0][1] === resalt.first && selectedButtons[1][1] === resalt.second) ||
    (selectedButtons[0][1] === resalt.second && selectedButtons[1][1] === resalt.first))){
        boolean= true
      }
 
    return boolean
  }

  private isExactaWinner(selectedButtons: number[][], resalt: { first: number, second: number, third: number }): boolean {
    var boolean= false
    if(selectedButtons.length === 2 && selectedButtons[0][1] === resalt.first && selectedButtons[1][1] === resalt.second){
        boolean= true
      }
 
    return boolean

  }

  private isWinWinner(selectedButtons: number[][], resalt: { first: number, second: number, third: number }): boolean {
    var boolean= false
    if(selectedButtons.length === 1 && selectedButtons[0][1] === resalt.first ){
        boolean= true
      }
 
    return boolean
   
  }

  async findAll() {
    const allGrayhornResult= await this.grayhornResulatModel.find().populate('tiketerId')
    return allGrayhornResult;
  }

  findOne(id: number) {
    return `This action returns a #${id} grayhornResulat`;
  }

  update(id: number, updateGrayhornResulatDto: UpdateGrayhornResulatDto) {
    return `This action updates a #${id} grayhornResulat`;
  }

  remove(id: number) {
    return `This action removes a #${id} grayhornResulat`;
  }
  
  async findByCriteria(
    startDate: Date,
    endDate: Date,
    gameId: string,

  ) {
    const query: any = {};

    if (startDate && endDate) {
      query['createdAt'] = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
      query['createdAt'] = { $gte: startDate };
    } else if (endDate) {
      query['createdAt'] = { $lte: endDate };
    }
    if (gameId) {
      query['gameId'] = gameId;
    }
    
    return await this.grayhornResulatModel.find(query).populate('tiketerId').exec();
  }
}
