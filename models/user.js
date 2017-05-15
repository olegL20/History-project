/**
 * Created by olegl on 15.05.2017.
 */
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    local: {

        username: {type: String, unique:false},
        password: {type: String, unique:false},
        email: {type: String, unique:false},
        teacher: {type: String, unique:false},
        role:{type: String, default: 'Учень', unique: false},
    },
    google: {
        id:String,
        token: String,
        name: String,

    },
    facebook:
        {   username: String,
            id:String,
            token: String,
            email: String,

        },
    twitte:{
        username:String,
        id:String,
        token:String,
        email:String
    },
    vkontakte:{
        username:String,
        id:String,
        token:String,
        email:String
    }



},{collection:'user'});

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('users', UserSchema, 'user');

