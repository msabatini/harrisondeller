import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Contact, ContactDocument } from '../schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    private configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = new this.contactModel(createContactDto);
    await contact.save();

    await this.sendEmail(createContactDto);

    return contact;
  }

  private async sendEmail(contactDto: CreateContactDto): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('SMTP_FROM'),
      to: this.configService.get<string>('CONTACT_EMAIL'),
      subject: `New Contact Form Submission: ${contactDto.subject || 'No Subject'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactDto.name}</p>
        <p><strong>Email:</strong> ${contactDto.email}</p>
        <p><strong>Subject:</strong> ${contactDto.subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${contactDto.message}</p>
      `,
      replyTo: contactDto.email,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  async markAsRead(id: string): Promise<Contact | null> {
    return this.contactModel
      .findByIdAndUpdate(id, { read: true }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.contactModel.findByIdAndDelete(id).exec();
  }
}
