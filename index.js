require("module-alias/register");
require("./db");
var bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const { generateRefreshToken } = require("@controllers/generateTokens");
const { attachCokiesToRes } = require("@controllers/general");
const port = process.env.PORT || 5000;
const app = express();
const USERS = require("@models/user/UserSchema");

app.use(cookieParser("h3iueiohalkfdqhjdhoi1308yehdif"));

require("dotenv").config({
  path: "./dev.env",
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const payload = {
        username: profile.emails[0].value,
      };
      let user = await USERS.findOne({ username: profile.emails[0].value });
      if (!user) {
        user = await USERS({
          username: profile.emails[0].value,
          name: profile.displayName,
          accountVerfication: true,
        });
        await user.save();
      }
      // Generate JWT token
      const token = payload;
      done(null, token);
    }
  )
);
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const token = await req.user;
    console.log(token);
    await attachCokiesToRes(res, token);
    // Redirect the user to the frontend with the JWT token as a query parameter
    res.redirect(`http://localhost:3000`);
  }
);

app.use(bodyParser.json());
app.use("*", cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/user", require("./routes/user/index"));
app.use("/auth", require("./routes/Authencation"));
app.use("/", require("./routes/routerIndex"));

// routes to handle
app.use("*", (req, res) => {
  res.status(404).json({ message: "page not found" });
});

app.listen(port, () => {
  console.log(`Listening at Port: ${port}`);
});
