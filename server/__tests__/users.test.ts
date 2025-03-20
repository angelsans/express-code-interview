import request from "supertest";
import app from '../src/app';
import data from '../src/data/index';

describe("Test GET /api/users", () => {
  
  test("Test 200", async () => {
    const res = await request(app).get("/api/users");
    expect(res.body.data.length).toEqual(data.length);
    expect(res.body.paging.totalResults).toEqual(data.length);
  });
  
  test("Test GET /api/users with page = 1", async () => {
    const res = await request(app).get("/api/users?page=1");
    expect(res.body.data.length).toEqual(data.length);
  });
  
  test("Test GET /api/users with page = 1 and size=1", async () => {
    const res = await request(app).get("/api/users?page=1&size=1");
    expect(res.body.data.length).toEqual(1);
    expect(res.body.paging.next).not.toBe(undefined);
  });
  
  test("Test GET /api/users with page = 2 and size=1", async () => {
    const res = await request(app).get("/api/users?page=2&size=1");
    expect(res.body.data.length).toEqual(1);
    expect(res.body.paging.previous).not.toBe(undefined);
    expect(res.body.paging.next).not.toBe(undefined);
  });

  test("Test GET /api/users with sort asc", async () => {
    const res = await request(app).get("/api/users?sort=name");
    expect(res.body.data.length).toEqual(data.length);
    expect(res.body.data[0].name).toEqual('Andrew');
  });
  test("Test GET /api/users with sort desc", async () => {
    const res = await request(app).get("/api/users?sort=name desc");
    expect(res.body.data.length).toEqual(data.length);
    expect(res.body.data[0].name).toEqual('Ori');
  });

  test("Test GET /api/users validations", async () => {
    const resPage = await request(app).get("/api/users?page=A");
    expect(resPage.body.code).toEqual(400);
    expect(resPage.body.message).toEqual('Invalid query parameters');
    expect(resPage.body.errors.length).toEqual(1);

    const resSize = await request(app).get("/api/users?size=B");
    expect(resSize.body.code).toEqual(400);
    expect(resSize.body.message).toEqual('Invalid query parameters');
    expect(resSize.body.errors.length).toEqual(1);

    const resSort = await request(app).get("/api/users?sort=lastName");
    expect(resSort.body.code).toEqual(400);
    expect(resSort.body.message).toEqual('Invalid sort query param');
    expect(resSort.body.errors.length).toEqual(1);
  });
});
