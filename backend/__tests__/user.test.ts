import request from "supertest";
import app from "../app";
import { connectDB } from "../config/db";

let connection, server;

beforeEach(async () => {
  connection = await connectDB();
  server = app.listen(5500);
});

afterEach(() => {
  connection.close();
  server.close();
});

const testUser = {
  name: "test",
  email: "test@test.com",
  password: "test",
};

describe("POST /api/user - Register endpoint", () => {
  it("Should register user", async () => {
    const res = await request(app).post("/api/user").send(testUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("created_at");
  });
  it("Should return with status 400 when no name is passed", async () => {
    const res = await request(app).post("/api/user").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Please enter all fields");
  });
  it("Should return with status 400 when user already exists", async () => {
    const res = await request(app).post("/api/user").send(testUser);
    expect(res.status).toBe(201);

    const res2 = await request(app).post("/api/user").send(testUser);
    expect(res2.status).toBe(400);
    expect(res2.body.message).toBe("User already exists");
  });
});

describe("POST /api/user/login - Login endpoint", () => {
  it("Should successfully Login", async () => {
    const res = await request(app).post("/api/user").send(testUser);
    expect(res.status).toBe(201);

    const res2 = await request(app)
      .post("/api/user/login")
      .send({ email: testUser.email, password: testUser.password });
    expect(res2.status).toBe(200);
    expect(res2.body).toHaveProperty("token");
    expect(res2.body).toHaveProperty("id");
    expect(res2.body).toHaveProperty("name");
    expect(res2.body).toHaveProperty("email");
    expect(res2.body).toHaveProperty("created_at");
  });
  it("Should return with status 400 when no email is passed", async () => {
    const res = await request(app).post("/api/user").send(testUser);
    expect(res.status).toBe(201);

    const res2 = await request(app).post("/api/user/login").send({
      password: testUser.password,
    });
    expect(res2.status).toBe(400);
    expect(res2.body.message).toBe("Please enter all fields");
  });
  it("Should return with status 401 when using when email is invalid", async () => {
    const res = await request(app).post("/api/user").send(testUser);
    expect(res.status).toBe(201);

    const res2 = await request(app).post("/api/user/login").send({
      email: "test@gmail.com",
      password: testUser.password,
    });

    expect(res2.status).toBe(401);
    expect(res2.body.message).toBe("Invalid credentials");
  });
  it("Should return with status 401 when using when password is invalid", async () => {
    const res = await request(app).post("/api/user").send(testUser);
    expect(res.status).toBe(201);

    const res2 = await request(app).post("/api/user/login").send({
      email: testUser.email,
      password: "wrong",
    });

    expect(res2.status).toBe(401);
    expect(res2.body.message).toBe("Invalid credentials");
  });
});

describe("GET /api/user - Get my user data end point", () => {
  it("Should return with status 200 and user data", async () => {
    const res = await request(app).post("/api/user").send(testUser);
    expect(res.status).toBe(201);

    const res2 = await request(app)
      .get("/api/user")
      .set({
        Authorization: `Bearer ${res.body.token}`,
      });

    expect(res2.status).toBe(200);
    expect(res2.body).toHaveProperty("id");
    expect(res2.body).toHaveProperty("name");
    expect(res2.body).toHaveProperty("email");
    expect(res2.body).toHaveProperty("created_at");
  });
  it("Should return with status 401 if no token", async () => {
    const res = await request(app).post("/api/user").send(testUser);
    expect(res.status).toBe(201);

    const res2 = await request(app).get("/api/user");

    expect(res2.status).toBe(401);
    expect(res2.body.message).toBe("Not authorized");
  });
});
