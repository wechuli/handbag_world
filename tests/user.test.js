const request = require("supertest");
const app = require("../server/app");
const User = require("../server/models/User.model");

const {
  clearAllDatabaseRecords,
  userOne,
  userTwo,
  makeDummyUsers
} = require("./fixtures/db");

/*
The makeDummyUsers creates dummy users of both admin and normal roles - all these found of the fixtures/db.js file

*/

// make a valid dummy users - both admin and normal
beforeAll(() => {
  return makeDummyUsers();
});

// clear all records from the test db after tests have finished
afterAll(() => {
  return clearAllDatabaseRecords();
});

beforeEach(() => {
  jest.setTimeout(10000);
});

describe("user registration", () => {
  test("should succeffully sign up a new user", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send(userOne)
      .expect(201);

    // //   assert that the database was changed correctly
    const user = await User.findOne({ email: userOne.email });

    expect(user).not.toBeNull();

    // // test that the password hashing worked correctly
    expect(user.password).not.toBe(userOne.password);
  });

  test("should return 400 (Bad request if user details are missing)", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send({
        email: "wechulipaul12334@gmail.com",
        name: "Paulo",
        password: "mysecurepass" //missing lastname
      })
      .expect(400);

    //   user should not have been created
    const user = await User.findOne({ email: "wechulipaul12334@gmail.com" });
    expect(user).toBeNull();
  });

  test("should return an error if email address is malformed", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send({
        email: "wechulipaul12334@", //invalid email address
        name: "Paulo",
        password: "mysecurepass",
        lastname: "Lastname"
      })
      .expect(400);

    //   user should not have been created
    const user = await User.findOne({ email: "wechulipaul12334@" });
    expect(user).toBeNull();
  });
});

describe("user login", () => {
  test("should login a valid user", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({
        email: userTwo.email,
        password: userTwo.password
      })
      .expect(200);

    // assert that a cookie was set

    expect(response["headers"]["set-cookie"]).toBeTruthy();
  });

  test("should not authenticate with wrong password", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({
        email: userTwo.email,
        password: "wrongPaswword123" //correct user, wrong password
      })
      .expect(401);
  });
});

describe("auth with cookies", () => {
  const agent = request.agent(app);

  test("should not authorize unauthenticated users", async () => {
    await agent.get("/api/users/auth").expect(401);
  });

  test("should set a cookie if user logs in successfully", async () => {
    const response = await agent
      .post("/api/users/login")
      .send({
        email: userTwo.email,
        password: userTwo.password
      })
      .expect(200);

    // check to see if user cookie has been set on the database
    const user = await User.findOne({
      email: userTwo.email
    });

    expect(user.token).toBeTruthy();
  });

  test("should successfully login a user after the cookie has been set", async () => {
    await agent.get("/api/users/auth").expect(200);
  });

  test("should successfully logout a user upon request", async () => {
    await agent.get("/api/users/logout").expect(200);

    // check db if token has been deleted
    const user = await User.findOne({
      email: userTwo.email
    });
    expect(user.token).toBeFalsy();
  });

  test("should not authorize a user that has already logged out, even when using a previously set cookie", async () => {
    await agent.get("/api/users/auth").expect(401);
  });
});
