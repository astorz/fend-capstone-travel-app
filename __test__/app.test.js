import { mainFunction } from "../src/client/js/app"

describe("Testing the main (submit) functionality", ()=>{
    test("Testing the mainFunction() function",()=>{
        expect(mainFunction).toBeDefined();
    })
});

// import { polarity } from "../src/client/js/formHandler"

// describe("Testing the polarity functionality", ()=>{
//     test("Testing polarity()", () => {
//         expect(polarity("N")).toEqual("negative");
//         expect(polarity("NEU")).toEqual("neutral");
//         expect(polarity("X")).toBeUndefined();
//     });
// });