import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";


describe("", () => {
    
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Should call successCallback when fetch returns true", async () => {

        const wasOk = await checkService.execute("https://google.com");

        expect( wasOk ).toBe( true );
        expect( successCallback ).toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        expect( mockRepository.saveLog ).toBeCalledWith( expect.any( LogEntity ) );

    });

    test("Should call errorCallback when fetch returns false", async () => {

        const wasOk = await checkService.execute("https://afafasfafgoogle.com");

        expect( wasOk ).toBe( false );
        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).toHaveBeenCalled();

        expect( mockRepository.saveLog ).toBeCalledWith( expect.any( LogEntity ) );

    });

})