const supertest = require("supertest");
const app = require("../index");

const api = "/api/peticoes";

describe("get peticoes todas", () => {
	it("should return a 200", async () => {
		await supertest(app).get(api).expect(200);
	});
});