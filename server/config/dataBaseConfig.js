// connection with the mongoose Locally
const mongoose = require('mongoose');

const dbConn = ()=>{
    mongoose
        .connect(process.env.DBstring)
        .then(()=>{
            console.log(`SuccessFully Connected to the DataBase`)
        })
        .catch((err)=>{
            console.log('Unavle to coonect with The DataBase')
        })
}


module.exports = dbConn;