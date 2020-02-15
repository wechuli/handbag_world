const request = require("supertest");
const app = require("../server/app");
const User = require("../server/models/User.model");

const {
  clearAllDatabaseRecords,
  userOne,
  userTwo,
  makeSingleValidDummyUser
} = require("./fixtures/db");

// clear all records from the test db before beginning to test
beforeAll(() => {
  jest.setTimeout(10000);
  return clearAllDatabaseRecords();
});

describe("user registration", () => {
  test("should succeffully sign up a new user", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send(userOne)
      .expect(201);

    //   assert that the database was changed correctly
    const user = await User.findById(response.body.userdata._id);

    expect(user).not.toBeNull();

    // test that the password hashing worked correctly
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
  // make a valid user before the tests, this is userTwo
  beforeAll(() => {
    jest.setTimeout(10000);
    return makeSingleValidDummyUser();
  });

  test("should login a valid user", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({
        email: userTwo.email,
        password: userTwo.password
      })
      .expect(200);

    // assert that a cookie was set   

    expect(response["headers"]["set-cookie"].length).toBe(1);
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
