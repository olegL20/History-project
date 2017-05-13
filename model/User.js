/**
 * Created by olegl on 13.05.2017.
 */
let mongorito = require('mongorito');
let Model = mongorito.Model;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User = module.exports = Model.extend({collection:'users'});

let user = new User({id: 1, name: 'Alex Lyt',password: 'admin',teacher: 'teach',role:'student'});


