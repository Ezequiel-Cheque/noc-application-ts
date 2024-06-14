import mongoose from "mongoose";
import { MongoDatabase } from "./init";



describe("init MongoDb", () => {

    afterAll(() => {
        mongoose.connection.close();
    });

    test("Should connect to mongoDB", async() => {
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        });
        expect(connected).toBe(true);
    });


    test("Should throw an error", async() => {
        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: "mongodb://ezequiel:password@localhosssst:27018"
            });
            expect(connected).toBe(false);
        } catch(error) {

        }
    });

});