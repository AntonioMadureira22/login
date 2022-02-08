const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/db.config");

//calling for middleware constants
const auth = require("./middleware/auth");
const error = require("./middleware/errors");

//used for conditionally skipping a middleware when met
const unless = require("express-unless");

const app = express();
const PORT = process.env.PORT || 5000;

//Do not need to a call a global promise ex: "mongoose.Promise = global.Promise;" because of Mongoose5
mongoose.connect(db.db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Database successfully connected");
    }, (error) => {
        console.log("Database not connected!:" + error);
    }
);

//middleware for authenticating the token submitted on request to skip if condition is met
auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            {url : "/users/login", method:["POST"]},
            {url : "/users/register", method:["POST"]}
        ]
    })
);

app.use(express.json());

app.use("/users", require("./routes/user.routes"));

app.use(error.errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

