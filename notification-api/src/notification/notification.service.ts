import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { NotificationContext } from './notification-context';
import { EmailNotification } from './notifications/email-notification.strategy';
import { SMSNotification } from './notifications/sms-notification.strategy';
import { PushNotification } from './notifications/pushnotification';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async sendNotification(message: string, type: string) {
    const context = new NotificationContext();

  
    switch (type) {
      case 'email':
        context.setStrategy(new EmailNotification());
        break;
      case 'sms':
        context.setStrategy(new SMSNotification());
        break;
      case 'push':
        context.setStrategy(new PushNotification());
        break;
      default:
        throw new Error('Tipo de notificación no válido');
    }
// Ejecuta la estrategia (aquí solo hace console.log)
context.executeStrategy(message);

// Guarda la notificación en la base de datos
const notification = this.notificationRepository.create({ message, type });
return this.notificationRepository.save(notification);
}

// Método adicional para consultar todas las notificaciones
async findAll() {
return this.notificationRepository.find();
}
}