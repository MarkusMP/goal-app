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

describe("POST /api/goals - create goal endpoint", () => {
  it("Should create goal and return status 200 and goal", async () => {
    const user = await request(app).post("/api/user").send(testUser);
    expect(user.status).toBe(201);

    const goal = await request(app)
      .post("/api/goals")
      .send({ text: "test" })
      .set("Authorization", `Bearer ${user.body.token}`);

    expect(goal.status).toBe(200);
    expect(goal.body).toHaveProperty("id");
    expect(goal.body).toHaveProperty("text");
    expect(goal.body.text).toBe("test");
    expect(goal.body).toHaveProperty("created_at");
  });
  it("Should return status 400 when text is empty", async () => {
    const user = await request(app).post("/api/user").send(testUser);
    expect(user.status).toBe(201);

    const goal = await request(app)
      .post("/api/goals")
      .send({ text: "" })
      .set("Authorization", `Bearer ${user.body.token}`);

    expect(goal.status).toBe(400);
    expect(goal.body.message).toBe("Text field is required");
  });
});

describe("PUT /api/goals/:id - update goal", () => {
  it("Should update goal", async () => {
    const user = await request(app).post("/api/user").send(testUser);
    expect(user.status).toBe(201);

    const goal = await request(app)
      .post("/api/goals")
      .send({ text: "test" })
      .set("Authorization", `Bearer ${user.body.token}`);

    expect(goal.status).toBe(200);

    const updatedGoal = await request(app)
      .put(`/api/goals/${goal.body.id}`)
      .send({ text: "newText" })
      .set("Authorization", `Bearer ${user.body.token}`);

    expect(updatedGoal.status).toBe(200);
    expect(updatedGoal.body).toHaveProperty("id");
    expect(updatedGoal.body).toHaveProperty("text");
    expect(updatedGoal.body.text).toBe("newText");
    expect(updatedGoal.body).toHaveProperty("created_at");
  });
  it("Should return status 400 when text is empty", async () => {
    const user = await request(app).post("/api/user").send(testUser);
    expect(user.status).toBe(201);

    const goal = await request(app)
      .post("/api/goals")
      .send({ text: "test" })
      .set("Authorization", `Bearer ${user.body.token}`);

    expect(goal.status).toBe(200);

    const updatedGoal = await request(app)
      .put(`/api/goals/${goal.body.id}`)
      .send({ text: "" })
      .set("Authorization", `Bearer ${user.body.token}`);

    expect(updatedGoal.status).toBe(400);
    expect(updatedGoal.body.message).toBe("Text field is required");
  });
  it("Should return status 404 when no goal is found", async () => {
    const user = await request(app).post("/api/user").send(testUser);
    expect(user.status).toBe(201);

    const updatedGoal = await request(app)
      .put(`/api/goals/ca387692-f83e-4389-8129-65cf0c72f042`)
      .send({ text: "newText" })
      .set("Authorization", `Bearer ${user.body.token}`);

    expect(updatedGoal.status).toBe(404);
    expect(updatedGoal.body.message).toBe("Goal not found");
  });
});

describe("GET /api/goals/ - get all goals", () => {
  it("Should find all goals by user", async () => {
    const user = await request(app).post("/api/user").send(testUser);
    expect(user.status).toBe(201);

    const goalOne = await request(app)
      .post("/api/goals")
      .send({ text: "testOne" })
      .set("Authorization", `Bearer ${user.body.token}`);

    const goalTwo = await request(app)
      .post("/api/goals")
      .send({ text: "testTwo" })
      .set("Authorization", `Bearer ${user.body.token}`);

    expect(goalOne.status).toBe(200);
    expect(goalTwo.status).toBe(200);

    const goals = await request(app)
      .get("/api/goals")
      .set("Authorization", `Bearer ${user.body.token}`);

    expect(goals.status).toBe(200);
    expect(goals.body).toHaveLength(2);
    expect(goals.body[0].text).toBe("testOne");
    expect(goals.body[1].text).toBe("testTwo");
  });
});

describe("DELETE /api/goals/:id - delete goal", () => {
  it("Should delete goal", async () => {
    const user = await request(app).post("/api/user").send(testUser);
    expect(user.status).toBe(201);

    const goal = await request(app)
      .post("/api/goals")
      .send({ text: "test" })
      .set("Authorization", `Bearer ${user.body.token}`);

    expect(goal.status).toBe(200);

    const deletedGoal = await request(app)
      .delete(`/api/goals/${goal.body.id}`)
      .set("Authorization", `Bearer ${user.body.token}`);

    expect(deletedGoal.status).toBe(200);
    expect(deletedGoal.body.message).toBe("Goal deleted");

    const goals = await request(app)
      .get("/api/goals")
      .set("Authorization", `Bearer ${user.body.token}`);

    expect(goals.status).toBe(200);
    expect(goals.body).toHaveLength(0);
  });
  it("Should return status 404 when no goal is found", async () => {
    const user = await request(app).post("/api/user").send(testUser);
    expect(user.status).toBe(201);

    const deletedGoal = await request(app)
      .delete(`/api/goals/ca387692-f83e-4389-8129-65cf0c72f042`)
      .set("Authorization", `Bearer ${user.body.token}`);

    expect(deletedGoal.status).toBe(404);
    expect(deletedGoal.body.message).toBe("Goal not found");
  });
});
