import mongoose from "mongoose";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";

describe("log.model.test.ts", () => {
    
    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        });
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test("Should return LogModel", async () => {
        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: 'low'
        }

        const log = await LogModel.create( logData );

        expect( log ).toEqual( expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String)
        }) );
    });

    test("Should return the same schema object", () => {
        const schema = LogModel.schema.obj;

        expect (schema).toEqual(expect.objectContaining({
            
        }));
    });

});