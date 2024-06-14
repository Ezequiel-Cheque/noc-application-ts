import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs";


describe("Send email log", () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    };

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const to = "ezequiel@callytek.com"; 

    const sendEmail = new SendEmailLogs(
        mockEmailService as any,
        mockRepository
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Should send email and save log",  async() => {

        const result = await sendEmail.execute(to);

        expect( result ).toBe(true);
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toBeCalledTimes(1);
        expect( mockRepository.saveLog ).toBeCalledWith( expect.any(LogEntity) );
        expect( mockRepository.saveLog ).toBeCalledWith({
            createdAt: expect.any(Date),
            message: `Email sent`,
            level: LogSeverityLevel.low,
            origin: "send-email-logs.ts"
        });

    });


    test("Should send email and save log",  async() => {

        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);

        const result = await sendEmail.execute(to);
    
        expect( result ).toBe(false);
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toBeCalledTimes(1);
        expect( mockRepository.saveLog ).toBeCalledWith( expect.any(LogEntity) );
        expect( mockRepository.saveLog ).toBeCalledWith({
            createdAt: expect.any(Date),
            message: expect.any(String),
            level: LogSeverityLevel.high,
            origin: "send-email-logs.ts"
        });

    });

});