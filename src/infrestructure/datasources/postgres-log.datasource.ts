import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityLevelEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDataSource extends LogDatasource {
    
    async saveLog(log: LogEntity): Promise<void> {
        const new_log = await prismaClient.logModel.create({
            data: {
                ...log,
                level: severityLevelEnum[log.level]
            }
        });
        console.log(`Postgres Log Created: ${new_log.id}`);
    }
    
    async getLogs(LogSeverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs  = await prismaClient.logModel.findMany({
            where: {
                level: severityLevelEnum[LogSeverityLevel],
            }
        });
        
        return logs.map(LogEntity.fromObject);
    }

}