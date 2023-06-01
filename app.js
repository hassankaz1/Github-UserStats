// require("dotenv").config();
const express = require('express');
const cors = require("cors");
const { BadRequestError, NotFoundError } = require("./expressError");



const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors())


const githubRoutes = require("./routes/Github");


app.use("/github", githubRoutes);

/* Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});



module.exports = app;