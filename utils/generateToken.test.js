const jwt = require("jsonwebtoken");
const generateToken = require("./generateToken")

process.env.SECRET_JWT = "testsecretkey";

describe("generatetoken", ()=>{
    // test case 1
    test("should generate a valid JWT token",()=>{
         
        const id= "64f1a2b3c4d5e6f7a8b9c0d1"; // fake mongo id jaisa

        const token = generateToken(id);

        expect(token).toBeDefined();
        expect(typeof token).toBe("string");

    })


    //  test case 2
    test("should encode the correct user id inside token",()=>{
         const id= "64f1a2b3c4d5e6f7a8b9c0d1";
         const token = generateToken(id);

         const decoded = jwt.verify(token,process.env.SECRET_JWT);

         expect(decoded.id).toBe(id);
    })
})