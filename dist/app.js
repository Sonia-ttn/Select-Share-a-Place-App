"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var form = document.querySelector('form');
var addressInput = document.getElementById('address');
var API_KEY = process.env.API_KEY;
function handler(event) {
    event.preventDefault();
    var entered = addressInput.value;
    axios_1["default"].get("https://maps.googleapis.com/maps/api/geocode/json?address=".concat(encodeURI(entered), "&key=").concat(API_KEY))
        .then(function (res) {
        if (res.data.status !== 'OK') {
            var coordinates = res.data.results[0].geometry.location;
            console.log(res);
            var map = new google.maps.Map(document.getElementById('map'), {
                center: coordinates,
                zoom: 15
            });
            new google.maps.Marker({ position: coordinates, map: map });
        }
    })["catch"](function (err) {
        console.log(err);
    });
}
form === null || form === void 0 ? void 0 : form.addEventListener('submit', handler);
