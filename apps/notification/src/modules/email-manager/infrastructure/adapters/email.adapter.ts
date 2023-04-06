import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailAdapter {
    constructor(private readonly configService: ConfigService){}
  async sendEmail(email: string, subject: string, message: string) {
    const transport = nodemailer.createTransport({
      service: this.configService.get("EMAIL_SERVICE"),
      auth: {
        user: this.configService.get("EMAIL_USER"),
        pass: this.configService.get("EMAIL_PASS"),
      },
    });

    const information = await transport.sendMail({
      from: this.configService.get("EMAIL_FROM"),
      to: email,
      subject,
      html: message,
    });

    return information; 
  }
}
