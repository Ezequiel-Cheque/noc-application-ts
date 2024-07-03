import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";


describe("LogRepositoryImpl tests", () => {

    const mockLogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const logRepositoryImpl = new LogRepositoryImpl(mockLogDataSource)
    
    beforeEach(() => {
        jest.clearAllMocks();
    });
    

    test("saveLog should call the datasource with arguments", async () => {
        const log = { level: LogSeverityLevel.low, message: "test log repository impl" } as LogEntity;
        await logRepositoryImpl.saveLog(log);
        expect( mockLogDataSource.saveLog ).toHaveBeenCalledWith( log );
    });


    test("getLogs should call the datasource with arguments", async () => {
        const lowSeverity = LogSeverityLevel.low;
        await logRepositoryImpl.getLogs(lowSeverity);
        expect( mockLogDataSource.getLogs ).toHaveBeenCalledWith( lowSeverity );
    });


});