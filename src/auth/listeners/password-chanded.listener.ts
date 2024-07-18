import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { PasswordChangedEvent } from '../events/password-changed.event';

@Injectable()
export class PasswordChangedListener {
  constructor(private readonly ) {}
  @OnEvent('password.changed')
  handlePasswordChangedEvent(event: PasswordChangedEvent) {
    try {
      const smsData = {
        phone: event.phone,
        text: `Hello ${event.name} , ${event.description} associated with your email address ${event.email}`,
      };
      console.log('Password Changed event', event);
    } catch (error) {
      console.log('Event Password Change Error', error);
    }
  }
}
