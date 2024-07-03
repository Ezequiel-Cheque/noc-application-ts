
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[];
}

interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {

    constructor(){}
    
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachements = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            });

            // console.log(sentInformation);
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: "Email sent",
                origin: "email.service.ts"
            })
            
            return true;
        } catch (error) {
            // console.log(error);
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: "Email not sent",
                origin: "email.service.ts"
            })
            
            return false;

        }

    }


    async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean>{
        const subject = "Logs del servidor";
        const htmlBody = `
            <h2>Logs de sistema - NOC</h2>
            <p>Loremp ipsum</p>
            <p>ver logs adjuntos</p>
        `;

        const attachements: Attachement[] = [
            { filename: "logs-all.log", path: "./logs/logs-low.log"},
            { filename: "logs-high.log", path: "./logs/logs-high.log"},
            { filename: "logs-medium.log", path: "./logs/logs-medium.log"}
        ];
        
        
        return this.sendEmail({
            to, subject, attachements, htmlBody
        })
    }

}