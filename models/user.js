/**
 * Created by olegl on 04.05.2017.
 */
var bcrypt = require('bcryptjs');
var  mongoose = require('mongoose');


var UserSchema = mongoose.Schema({ login:{type:String}, name: { type: String }, password: {type: String }, email: {type: String }, teacher: {type: String }, role: {type:String}
});

var User = module.exports = mongoose.model('User',UserSchema);
module.exports.createUser = function (newUser,callback){
    bcrypt.getSalt(10,function (err,salt) {
        bcrypt.hash(newUser.password,salt,function (err, hash){
            if(err) throw err;
                newUser.password = toString(hash);
                newUser.save(callback);
            }
        );
    })
}