import { CronService } from "./cron-service";


describe("Cron tests", () => {


    const mockCron = jest.fn();

    test("Should create a job", (done) => {
        const job = CronService.createJob('* * * * * *', mockCron);
        
        setTimeout(() => {
            expect( mockCron ).toBeCalledTimes(2)
            job.stop();
            done();
        }, 2000)
    
    });


});