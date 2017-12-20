"use strict";

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sayHello = function sayHello() {
    console.log("hello babel");
};

_axios2.default.get("http://git.feidee.org/api/v3/projects?private_token=W5mqXVBoT9oJgE5Asv8t").then(function (response) {
    console.log(response);
}).catch(function (error) {
    console.log(error);
});
