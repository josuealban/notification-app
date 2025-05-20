import { Controller, Post, Get, Body} from '@nestjs/common';
import { NotificationsService } from './notification.service';

@Controller('notifications')
export class NotificationsController{
    constructor(private readonly notificationService: NotificationsService) {}
    @Post()
    async sendNotification(@Body('message') message: string, @Body('type') type: string) {
        return this.notificationService.sendNotification(message, type);
    }
    @Get()
    async getAllNotifications() {
        return this.notificationService.findAll();
    }}