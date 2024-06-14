import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDataSource implements LogDatasource {
    
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log(`Mongo Log created:`, newLog.id);
    }


    async getLogs(LogSeverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: LogSeverityLevel
        });
        // return logs.map(mongoLog => LogEntity.fromObject(mongoLog));
        return logs.map(LogEntity.fromObject);
    }

}