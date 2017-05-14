

let mongorito = require('mongorito');
const flash= require('connect-flash');
let Model = mongorito.Model;
const User  = Model.extend({collection:'users'});

let vavr = new User({
    name: 'name',place: 'OBX'
});
vavr.save();