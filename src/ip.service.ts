import { Injectable } from '@nestjs/common';
import * as os from 'os';

@Injectable()
export class IpService {
  getLocalIP(): string {
    const interfaces = os.networkInterfaces();
    for (const iface in interfaces) {
      for (const alias of interfaces[iface]) {
        if (alias.family === 'IPv4' && !alias.internal) {
          return alias.address;
        }
      }
    }
    return '127.0.0.1';
  }
}
