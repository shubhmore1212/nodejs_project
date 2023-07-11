const request = require("supertest");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const { app } = require("../../index.js");

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

describe("POST User /create", () => {
  it("should respond with 200 for success", async () => {
    const response = await request(app).post("/user/create").send({
      name: "Shubh",
      username: "shubh@gmail.com",
      password: "shubh@123",
    });
    console.log("200 object", response.body);
    expect(response.statusCode).toBe(200);
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

jest.mock("../../services/auth.js", () => ({
  loginUser: jest.fn().mockResolvedValue({
    status: 200,
    authToken: "jwt",
    message: "Login Successfull",
  }),
}));

describe("Auth POST /auth/login", () => {
  it("should respond with 200 on sucessfull login", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "shubh@gmail.com",
      password: "shubh123",
    });

    expect(response.statusCode).toBe(200);
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

jest.mock("../../services/movie.js", () => ({
  searchMovie: jest.fn().mockResolvedValue({
    status: 200,
    message: {
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "8.2/10",
        },
        {
          Source: "Rotten Tomatoes",
          Value: "94%",
        },
        {
          Source: "Metacritic",
          Value: "86/100",
        },
      ],
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
      Language: "French, Russian, English",
      Country: "France, Algeria",
      Awards: "Won 2 Oscars. 12 wins & 13 nominations total",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNDQ4ZTI5NTktOTY2ZS00NmM3LWE2ZTAtMTdjNzFmOWYzYzhkXkEyXkFqcGdeQXVyNjMwMjk0MTQ@._V1_SX300.jpg",
      Metascore: "86",
      imdbRating: "8.2",
      imdbVotes: "30,020",
      imdbID: "tt0065234",
      Type: "movie",
      DVD: "27 Oct 2009",
      BoxOffice: "$83,305",
      Production: "N/A",
      Website: "N/A",
      Response: "True",
    },
  }),
}));

describe("Movie GET /movie/search", () => {
  it("should respond with 200 for success", async () => {
    const response = await request(app)
      .get("/movie/search")
      .send({
        movie_name: "Dus",
      })
      .set("Authorization", authToken);

    expect(response.statusCode).toBe(200);
  });

  it("should respond with 401 for success", async () => {
    const response = await request(app).get("/movie/search").send({
      movie_name: "Dus",
    });

    expect(response.statusCode).toBe(401);
  });

  // it("should respond with 200 for success", async () => {
  //   const response = await request(app)
  //     .get("/movie/search")
  //     .send({})
  //     .set("Authorization", authToken);

  //   expect(response.statusCode).toBe(422);
  // });
});
