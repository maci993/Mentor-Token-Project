const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const { getSection } = require("./handlers/pkg/config");
const { login, register } = require("./handlers/auth");

require("./handlers/pkg/db");

const app = express();

app.use(express.json());
app.use(
    jwt({
        secret: getSection("development").jwt_secret,
        algorithms: ["HS256"],
    }).unless({
        path: [
            "/api/auth/login",
            "/api/auth/register",
        ],
    })
);

app.post( "/api/auth/login", login);
app.post("/api/auth/register", register);

app.listen(getSection("development").port, () => {
    console.log(`Server started at port ${getSection("development").port}`);
  });