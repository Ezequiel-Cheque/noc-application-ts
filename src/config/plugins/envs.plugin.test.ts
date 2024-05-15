import { envs } from "./envs.plugin";

describe("envs,plugin.ts", ()=> {

    test("Shoulkd return envs options", () => {
        // console.log(envs);
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_EMAIL: 'delaluzezequiel@gmail.com',
            MAILER_SECRET_KEY: 'yfzeqvsdonixqrga',
            PROD: false,
            MAILER_SERVICE: 'gmail',
            MONGO_URL: 'mongodb://ezequiel:password@localhost:27018',
            MONGO_DB_NAME: 'noc'
        });
    })

    test("Should return error if not found env", async () => {
        
        jest.resetModules();
        process.env.PORT = "ABC";

        try {
            await import('./envs.plugin');
            expect(true).toBe(false);
        
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }

    });

});