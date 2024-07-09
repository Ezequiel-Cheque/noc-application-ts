import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from './email.service';

describe("EmailService", () => {

    const mockSendEmail = jest.fn();
    
    // Mock al createTransport 
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendEmail
    });
    
    const emailService = new EmailService();
    
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

    test("Should send email with attachments", async () => {
        
        const email = 'ezequiel@callytek.com';
        await emailService.sendEmailWithFileSystemLogs(email);

        expect( mockSendEmail ).toHaveBeenLastCalledWith({
            to: email,
            subject: "Logs del servidor",
            html: expect.any( String ),
            attachments: expect.arrayContaining([
                { filename: "logs-all.log", path: "./logs/logs-low.log"},
                { filename: "logs-high.log", path: "./logs/logs-high.log"},
                { filename: "logs-medium.log", path: "./logs/logs-medium.log"}
            ])
        });

    });

});