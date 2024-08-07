import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from "fs";



export class FileSystemDataSource implements LogDatasource {

    private readonly logPath = "logs/";
    private readonly allLogsPath = "logs/all-logs.log";
    private readonly lowLogsPath = "logs/logs-low.log";
    private readonly mediumLogsPath = "logs/logs-medium.log";
    private readonly highLogsPath = "logs/logs-high.log";

    constructor() {
        this.createLogsFiles();
    }
    
    private createLogsFiles() {
        if(!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        [   
            this.allLogsPath,
            this.lowLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach( path => {
            if( fs.existsSync( path )) return;
            fs.writeFileSync(path, "");
        });

    }

    async saveLog(newlog: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(newlog)}\n`;
        
        fs.appendFileSync(this.allLogsPath, logAsJson);

        if(newlog.level === LogSeverityLevel.low){
            fs.appendFileSync(this.lowLogsPath, logAsJson);
        };

        if(newlog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        }
        if (newlog.level === LogSeverityLevel.high) {
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }

    }

    private getLogFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, "utf-8");
        if (content === '') return [];
        const logs = content.split("\n").filter((line)=>line != "").map(LogEntity.fromJson);
        return logs;
    };

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch( severityLevel ) {
            // case LogSeverityLevel.all:
            //     return this.getLogFromFile(this.allLogsPath);
            case LogSeverityLevel.low:
                return this.getLogFromFile(this.lowLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogFromFile(this.mediumLogsPath);;
            case LogSeverityLevel.high:
                return this.getLogFromFile(this.highLogsPath);;
            
            default:
                throw new Error(`${severityLevel} not implemented.`);
        }
    }

}