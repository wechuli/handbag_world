const request = require("supertest");
const app = require("../server/app");
const User = require("../server/models/User.model");

const { clearAllDatabaseRecords, userOne } = require("./fixtures/db");

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
});
