import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from './email.service';

describe("EmailService", () => {

    const mockSendEmail = jest.fn();
    const emailService = new EmailService();

    // Mock al createTransport 
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendEmail
    });

    test("Should send email", async () => {

        const options: SendMailOptions = {
            to: 'ezequiel@callytek.com',
            subject: "Test",
            htmlBody: '<h1>Test</h1>'
        };

        await emailService.sendEmail( options );

        expect( mockSendEmail ).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: '<h1>Test</h1>',
            subject: 'Test',
            to: 'ezequiel@callytek.com'
        });
    });

    test("", () => {
        
    });

});