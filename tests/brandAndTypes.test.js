const request = require("supertest");
const app = require("../server/app");
const User = require("../server/models/User.model");
const Brand = require("../server/models/Brand.model");
const BagType = require("../server/models/BagType.model");

const {
  clearAllDatabaseRecords,
  userOne,
  userTwo,
  userThree,
  makeDummyUsers,
  handbagBrands,
  handbagTypes
} = require("./fixtures/db");

/*
The makeDummyUsers creates dummy users of both admin and normal roles - all these found of the fixtures/db.js file

*/

// clear all records from the test db after tests have finished
afterAll(() => {
  return clearAllDatabaseRecords();
});

// make a valid dummy users - both admin and normal
beforeAll(() => {
  return makeDummyUsers();
});

beforeEach(() => {
  jest.setTimeout(10000);
});

describe("Brand crud operations - Admin", () => {
  const agent = request.agent(app);
  test("should set an admin user to perform brand CRUD actions", async () => {
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
      .send({ name: handbagBrands[0] })
      .expect(200);

    //check db to confirm brand was created
    const brand = await Brand.findOne({ name: handbagBrands[0] });
    expect(brand).not.toBeNull();
  });

  test("should succeffully create a new bag type in the database", async () => {
    const resp = await agent
      .post("/api/product/bagtype")
      .send({ name: handbagTypes[0] })
      .expect(200);

 
    //check db to confirm bag type was created
    const bagType = await BagType.findOne({ name: handbagTypes[0] });
    expect(bagType).not.toBeNull();
  });
});

describe("Brand CRUD operations - normal user", () => {
  const agent = request.agent(app);

  test("should set a normal user to test brand CRUD actions", async () => {
    const response = await agent
      .post("/api/users/login")
      .send({
        email: userThree.email,
        password: userThree.password
      })
      .expect(200);
  });

  test("should disallow creation of a new brand by a logged in user who is not an admin", async () => {
    await agent
      .post("/api/product/brand")
      .send({ name: handbagBrands[1] })
      .expect(401);

    //check db to confirm theat the brand was NOT created
    const brand = await Brand.findOne({ name: handbagBrands[1] });
    expect(brand).toBeNull();
  });

  test("should return a list of all brands", async () => {
    await agent.get("/api/product/brand").expect(200);
  });

  test("should return a list of all bag types", async () => {
    await agent.get("/api/product/bagtype").expect(200);
  });
});
