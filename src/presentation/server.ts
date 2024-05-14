import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infrestructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrestructure/datasources/mongo-log.datasource';
import { PostgresLogDataSource } from '../infrestructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDataSource()
);

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource()
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
    
    // const logs = await logRepository.getLogs(LogSeverityLevel.high);
    // console.log(logs);
    
    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'http://google.com'
        new CheckServiceMultiple(
          [
            fsLogRepository, mongoLogRepository, postgresLogRepository
          ],
          () => console.log( `${ url } is ok` ),
          ( error ) => console.log( error ),
        ).execute( url );
        
      }
    );

  }

}


