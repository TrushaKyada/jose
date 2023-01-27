const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://trusha_kyada:tru%40sha098@cluster0.iyckzvk.mongodb.net/test")
    .then(() => {
        console.log("database connected successfully...");
    })
    .catch((err) => {
        console.log("database not connected");
    });
