"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var bodyParser = require("body-parser");
var cors = require("cors");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
var participants_route_1 = require("./routes/onsite/participants.route");
app.use("/onsite/participants", participants_route_1.participantsRouter);
app.get("/", function (req, res) {
    res.send("Techno Event Server");
});
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
exports.default = app;
