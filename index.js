const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const ApiError = require("./utils/ApiError");

const app = express();

// app level middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


// define routes
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// global error middleware
app.use((err, req, res, next) => {
    console.error("❌❌ ", err);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            ...(err.data && { data: err.data }),
        });
    }

    res.status(500).json({ message: "something went wrong" });
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
