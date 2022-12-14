//////////// dependencies /////////////

const express = require("express");
const path = require("path");
const serveFnGen = require("./staticServe");

/// console.log ///
{
    const { log } = console;
    console.logU = (msg) => {
        log(
            `
` + msg
        );
    };

    console.logD = (msg) => {
        log(
            msg +
                `
`
        );
    };

    console.logUD = (msg) => {
        console.logU(msg);
        console.logD("");
    };
}
////////////

const app = express();

const autoGeneratedRoutesLog = [];
const serve = serveFnGen(app, autoGeneratedRoutesLog);

require("dotenv").config();

/////////////// routing /////////////

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

////// uncaught error handling ////////

process.on("uncaughtException", (err) => console.error(err));

/////////// server init //////////

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.logUD(`listening on port ${PORT}...`));
