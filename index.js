const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const ApiError = require("./utils/ApiError");
const reqLogger = require("./middlewares/reqLogger");
const errorHandler = require("./middlewares/errorHandler");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// app level middlewares
app.use(express.json());
app.use(cors());
// app.use(morgan("dev"));
app.use(reqLogger);


// define routes
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`✅✅ Server is running on http://localhost:${PORT}`);
    mongoose.connect(process.env.DATABASE_URI).then(() => {
        console.log("✅✅ Database connected successfully");
    }).catch((err) => {
        console.log("❌❌ Database connection failed", err);
    });
});
