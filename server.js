const express = require("express");

const cors = require("cors");

require("dotenv").config();

const authRoutes =
require("./routes/authRoutes");

const contactRoutes =
require("./routes/contactRoutes");

const templateRoutes =
require("./routes/templateRoutes");

const campaignRoutes =
require("./routes/campaignRoutes");

const authMiddleware =
require("./middleware/authMiddleware");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/contacts",
  contactRoutes
);

app.use(
  "/api/templates",
  templateRoutes
);

app.use(
  "/api/campaigns",
  campaignRoutes
);

app.get(
  "/api/dashboard",
  authMiddleware,
  (req, res) => {

    res.json({
      message:
        "Welcome to dashboard",
      user: req.user,
    });

  }
);

app.get("/", (req, res) => {

  res.send("Backend Running");

});

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});