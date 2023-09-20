import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

interface SendMailArgs {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
}

@Injectable()
export class SendGridService {
  constructor(private readonly configService: ConfigService) {
    sgMail.setApiKey(this.configService.getOrThrow<string>('SENDGRID_API_KEY'));
  }

  async sendMail(message: SendMailArgs): Promise<void> {
    try {
      await sgMail.send(message);
    } catch (error) {
      console.log(`Error sendgrid `, error);

      throw new InternalServerErrorException();
    }
  }
}
