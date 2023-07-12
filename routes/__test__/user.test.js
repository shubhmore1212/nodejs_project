const request = require("supertest");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const { app } = require("../../index.js");

const movie = {
  Title: "Z",
  Year: "1969",
  Rated: "M/PG",
  Released: "08 Dec 1969",
  Runtime: "127 min",
  Genre: "Crime, Drama, Thriller",
  Director: "Costa-Gavras",
  Writer: "Vassilis Vassilikos, Jorge Semprún, Costa-Gavras",
  Actors: "Yves Montand, Irene Papas, Jean-Louis Trintignant",
  Plot: "The public murder of a prominent politician and doctor amid a violent demonstration is covered up by military and government officials. A tenacious magistrate is determined not to let them get away with it.",
};

const authToken = jwt.sign(
  { username: "username", password: "password" },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d",
  }
);

jest.mock("../../services/user.js", () => ({
  addUser: jest.fn().mockResolvedValue({
    status: 200,
    message: "User created sucessfully",
  }),
}));

jest.mock("../../services/auth.js", () => ({
  loginUser: jest.fn().mockResolvedValue({
    status: 200,
    authToken: "jwt",
    message: "Login Successfull",
  }),
}));

jest.mock("../../services/movie.js", () => ({
  searchMovie: jest.fn().mockResolvedValue({
    status: 200,
    message: movie,
  }),
  insertMovie: jest.fn().mockResolvedValue(movie),
}));

describe("POST User /create", () => {
  it("should respond with 200 for success", async () => {
    const response = await request(app).post("/user/create").send({
      name: "Shubh",
      username: "shubh@gmail.com",
      password: "shubh@123",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.data[0].message).toEqual("User created sucessfully");
  });

  it("should respond with 422 if the user sends invalid body", async () => {
    const objects = [
      {},
      { name: "name" },
      { username: "username" },
      { password: "password" },
      {
        name: "Shubh",
        username: "shubh@gmail.com",
      },
      {
        username: "shubh@gmail.com",
        password: "shubh@123",
      },
      {
        name: "",
        username: "shubh@gmail.com",
        password: "shubh@123",
      },
      {
        name: "Shubh",
        username: "",
        password: "shubh@123",
      },
      {
        name: "Shubh",
        username: "shubh@gmail.com",
        password: "",
      },
    ];

    for (let object of objects) {
      const response = await request(app).post("/user/create").send(object);

      expect(response.statusCode).toBe(422);
      expect(response.body.data[0].name).toEqual("Validation Error");
    }
  });
});

describe("Auth POST /auth/login", () => {
  it("should respond with 200 on sucessfull login", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "shubh@gmail.com",
      password: "shubh123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.data[0].message).toEqual("Login Successfull");
  });

  it("should respond with 422 if the user sends invalid body ", async () => {
    const objects = [
      {},
      {
        username: "",
        password: "",
      },
      {
        username: "",
        password: "shubh123",
      },
      {
        username: "shubh@gmail.com",
        password: "",
      },
      {
        password: "shubh123",
      },
      {
        username: "shubh@gmail.com",
      },
    ];

    for (let object of objects) {
      const response = await request(app).post("/auth/login").send(object);

      expect(response.statusCode).toBe(422);
      expect(response.body.data[0].name).toBe("Validation Error");
    }
  });
});

describe("Movie GET /movie/search", () => {
  it("should respond with 200 for success", async () => {
    const response = await request(app)
      .get("/movie/search")
      .send({
        movie_name: "Dus",
      })
      .set("Authorization", authToken);

    expect(response.statusCode).toBe(200);
    expect(response.body.data[0].message).toEqual(movie);
  });

  it("should respond with 401 for success", async () => {
    const response = await request(app).get("/movie/search").send({
      movie_name: "Dus",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.data[0].message).toEqual("Access Denied");
  });

  it("should respond with 422 for unprocessable body", async () => {
    const objects = [{}, { movie_name: "" }, { movie_name: "  " }];

    for (let object of objects) {
      const response = await request(app)
        .get("/movie/search")
        .send(object)
        .set("Authorization", authToken);

      expect(response.statusCode).toBe(422);
      expect(response.body.data[0].name).toEqual("Validation Error");
    }
  });
});

describe("Movie POST /movie/create", () => {
  it("should respond with 200 for success", async () => {
    const response = await request(app)
      .post("/movie/create")
      .send(movie)
      .set("Authorization", authToken);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ data: [movie] });
  });

  it("should respond with 401 if token not present", async () => {
    const response = await request(app).post("/movie/create").send(movie);

    expect(response.statusCode).toBe(401);
    expect(response.body.data[0].message).toEqual("Access Denied");
  });
});
