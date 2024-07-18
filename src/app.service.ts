import { Injectable } from '@nestjs/common';
import { GrayhornDocument } from 'src/grayhorn/entities/grayhorn.entity'
import { Model } from 'mongoose';
import { AnimeDogDocument } from 'src/anime-dog/entities/anime-dog.entity'
import { AnimeHorDocument } from 'src/anime-hors/entities/anime-hor.entity'
import { InjectModel } from '@nestjs/mongoose';
import { KenoDocument } from 'src/keno/entities/keno.entity'
@Injectable()
export class AppService {

  constructor(
    @InjectModel('Grayhorn')
    private readonly grayhornModel:Model<GrayhornDocument>,

    @InjectModel("AnimeHor")
    private readonly animeHorModel:Model<AnimeHorDocument>,

    @InjectModel("AnimeDog")
    private readonly animeDogModel: Model<AnimeDogDocument>,

    @InjectModel("Keno")
    private readonly kenoModel: Model<KenoDocument>

  ){}

 
 async calculateStats(model: Model<any>, tiketerId: string, currentDate: Date): Promise<{ total: number, paid: number, profit: number }> {

    const year = currentDate.getUTCFullYear();
  const month = currentDate.getUTCMonth();
  const day = currentDate.getUTCDate();
  
  // Start and end of the day in UTC
  const startOfDay = `0${month+1}-${day}-${year}`;
    // Format currentDate as "YYYY-MM-DD"
    const query: any = {};
  
    query['createdAt'] = {$gte: startOfDay };
    query['tiketerId'] = {tiketerId}.tiketerId;

    // Find documents for the given date
    const documents = await model.find(
      query
    ).exec();
    let total = 0;
    let paid = 0;
  
    documents.forEach(doc => {
      doc.bets.forEach(bet => {
        total += bet.betAmount;
        if (bet.win) {
          paid += bet.prize;
        }
      });
    });
  
    const profit = total - paid;
  
    return { total, paid, profit };
  }
  
  async getStat(tiketerId: string) {
    const currentDate = new Date();
  
    const stat = {
      animehors: await this.calculateStats(this.animeHorModel, tiketerId, currentDate),
      animeDog: await this.calculateStats(this.animeDogModel, tiketerId, currentDate),
      tryfecta: await this.calculateStats(this.grayhornModel, tiketerId, currentDate),
      keno: await this.calculateStats(this.kenoModel, tiketerId, currentDate)
    };
  
    return stat;
  }

  getHello(): any {
    const now = new Date();
    const currentTime = now;

    const timeDetails = { 
      time: currentTime, 
      year: now.getUTCFullYear(), 
      month: now.getUTCMonth() + 1, // Months are 0-indexed
      day: now.getUTCDate(), 
      hour: now.getUTCHours(), 
      minute: now.getUTCMinutes(), 
      second: now.getUTCSeconds() 
    };

    return timeDetails;
  }
}
