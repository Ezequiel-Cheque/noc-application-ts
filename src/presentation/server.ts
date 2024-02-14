import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infrestructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource(),
);

const emailService = new EmailService ();

export class Server {

  public static start() {

    console.log( 'Server started...' );
    
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(["ezekiel.garcia@platimex.com.mx"]);

    // emailService.sendEmailWithFileSystemLogs([
    //   "ezekiel.garcia@platimex.com.mx"
    // ]);

    // emailService.sendEmail({
    //   to: "ezekiel.garcia@platimex.com.mx",
    //   subject: "Logs de sistema",
    //   htmlBody: `
    //     <h2>Logs de sistema - NOC</h2>
    //     <p>Loremp ipsum</p>
    //     <p>ver logs adjuntos</p>
    //   `
    // });
    
    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     // const url = 'http://localhost:3000';
    //     const url = 'http://google.com'
    //     new CheckService(
    //       fileSystemLogRepository,
    //       // undefined, undefined
    //       () => console.log( `${ url } is ok` ),
    //       ( error ) => console.log( error ),
    //     ).execute( url );
    //     // new CheckService().execute( 'http://localhost:3000' );
        
    //   }
    // );

  }

}


