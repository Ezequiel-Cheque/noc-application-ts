import fs from "fs";
import path from "path";
import { FileSystemDataSource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("FileSystemDataSource", () => {

    const logPath = path.join(__dirname, "../../../logs")
    
    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    })

    test("Should create log if the dontexist", () => {
        new FileSystemDataSource();
        const files = fs.readdirSync( logPath );
        expect(files).toEqual( [ 'all-logs.log', 'logs-high.log', 'logs-low.log', 'logs-medium.log' ] );
    });

    test("Should save a log in all-logs.log and logs-low.log", () => {
        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            message: "test",
            level: LogSeverityLevel.low,
            origin: "file-system.datasource.test.ts"
        });

        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${ logPath }/all-logs.log`, 'utf-8');
        const lowLogs = fs.readFileSync(`${ logPath }/logs-low.log`, 'utf-8');
        expect(allLogs).toContain( JSON.stringify(log) );
        expect(lowLogs).toContain( JSON.stringify(log) );
    });


    test("Should save a log in all-logs.log and logs-medium.log", () => {
        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            message: "test",
            level: LogSeverityLevel.medium,
            origin: "file-system.datasource.test.ts"
        });

        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${ logPath }/all-logs.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${ logPath }/logs-medium.log`, 'utf-8');
        expect(allLogs).toContain( JSON.stringify(log) );
        expect(mediumLogs).toContain( JSON.stringify(log) );
    });


    test("Should save a log in all-logs.log and logs-high.log", () => {
        const logDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            message: "test",
            level: LogSeverityLevel.high,
            origin: "file-system.datasource.test.ts"
        });

        logDataSource.saveLog(log);
        const allLogs = fs.readFileSync(`${ logPath }/all-logs.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${ logPath }/logs-high.log`, 'utf-8');
        expect(allLogs).toContain( JSON.stringify(log) );
        expect(highLogs).toContain( JSON.stringify(log) );
    });

    test("Should get all logs", async () => {
        const logDatasource = new FileSystemDataSource();

        const lowLog = new LogEntity({
            message: "log-low",
            level: LogSeverityLevel.low,
            origin: "file-system.datasource.test.ts"
        });
        
        const mediumLog = new LogEntity({
            message: "medium-log",
            level: LogSeverityLevel.medium,
            origin: "file-system.datasource.test.ts"
        });

        const highLog = new LogEntity({
            message: "high-log",
            level: LogSeverityLevel.high,
            origin: "file-system.datasource.test.ts"
        });

        await logDatasource.saveLog(lowLog);
        await logDatasource.saveLog(mediumLog);
        await logDatasource.saveLog(highLog);
        
        const getAllLogs = await logDatasource.getLogs(LogSeverityLevel.all);
        const getLowLogs = await logDatasource.getLogs(LogSeverityLevel.low);
        const getMedoiumLogs = await logDatasource.getLogs(LogSeverityLevel.medium);
        const getHighLogs = await logDatasource.getLogs(LogSeverityLevel.high);
        
        expect(getAllLogs).toEqual(expect.arrayContaining([lowLog, mediumLog, highLog]));
        expect(getLowLogs).toEqual(expect.arrayContaining([lowLog]));
        expect(getMedoiumLogs).toEqual(expect.arrayContaining([mediumLog]));
        expect(getHighLogs).toEqual(expect.arrayContaining([highLog]));
        
    });


    test("Should not throw an error if path exists", async () => {
        new FileSystemDataSource();
        new FileSystemDataSource();

        expect(true).toBeTruthy();

    });

    test("Should throw an error if security level is not defined", async () => {

        const logDatasource = new FileSystemDataSource();
        const customSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;

        try {
            await logDatasource.getLogs(customSeverityLevel);
            expect(true).toBeFalsy();
        } catch (error) {
            const errorString = `${ error }`;

            expect(errorString).toContain(`${ customSeverityLevel } not implemented`);
        }

    });

})