/**
 * Created by olegl on 04.05.2017.
 */
var model = require('mysql-model');
var bcscrypt = require('bcryptjs');

var AppModel = model.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'mydb'
});

var User = module.exports = new AppModel.extend({
    tableName: 'User'
})
module.exports.createUser= function(newUser,callback)
{

    const saltRounds = 10;
    const myPlaintextPassword = 's0/\/\P4$$w0rD';
    const someOtherPlaintextPassword = 'not_bacon';
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(newUser.fieldName('password'), salt, function(err, hash) {
            // Store hash in your password DB.
        });
    });
}
    
