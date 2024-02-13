import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infrestructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource(),
);

export class Server {

  public static start() {

    console.log( 'Server started...' );

    
    CronService.createJob(
      '*/5 * * * * *',
      () => {
        // const url = 'http://localhost:3000';
        const url = 'http://google.com'
        new CheckService(
          fileSystemLogRepository,
          // undefined, undefined
          () => console.log( `${ url } is ok` ),
          ( error ) => console.log( error ),
        ).execute( url );
        // new CheckService().execute( 'http://localhost:3000' );
        
      }
    );

  }

}


