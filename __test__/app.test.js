import { mainFunction } from "../src/client/js/app"

describe("Testing the main (submit) functionality", ()=>{
    test("Testing the mainFunction() function",()=>{
        expect(mainFunction).toBeDefined();
    })
});