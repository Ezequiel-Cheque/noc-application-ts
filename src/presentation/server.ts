import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infrestructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrestructure/datasources/mongo-log.datasource';
import { LogRepositoryImpl } from '../infrestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const logRepository = new LogRepositoryImpl(
  new FileSystemDataSource(),
  // new MongoLogDataSource()
);

const emailService = new EmailService ();

export class Server {

  public static async start() {

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
    
    const logs = await logRepository.getLogs(LogSeverityLevel.low);
    console.log(logs);
    
    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'http://google.com'
    //     new CheckService(
    //       logRepository,
    //       () => console.log( `${ url } is ok` ),
    //       ( error ) => console.log( error ),
    //     ).execute( url );
        
    //   }
    // );

  }

}


