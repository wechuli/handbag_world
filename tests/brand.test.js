const request = require("supertest");
const app = require("../server/app");
const User = require("../server/models/User.model");
const Brand = require("../server/models/Brand.model");

const {
  clearAllDatabaseRecords,
  userOne,
  userTwo,
  makeSingleValidDummyUser
} = require("./fixtures/db");

/*
The makeSingleValidDummyUser() function makes a single user in the DB using userTwo details - all these found of the fixtures/db.js file

*/

// clear all records from the test db after tests have finished
afterAll(() => {
  return clearAllDatabaseRecords();
});

beforeEach(() => {
  jest.setTimeout(10000);
});

describe("Brand crud operations", () => {
  // make a valid user before the tests, this is userTwo
  beforeAll(() => {
    return makeSingleValidDummyUser();
  });
  const agent = request.agent(app);
  test("should set user to perform brand CRUD actions", async () => {
    const response = await agent
      .post("/api/users/login")
      .send({
        email: userTwo.email,
        password: userTwo.password
      })
      .expect(200);
  });

  test("should succeffully create a new brand in the database", async () => {
    await agent
      .post("/api/product/brand")
      .send({ name: "Yallo Leathers" })
      .expect(200);
  });
});
