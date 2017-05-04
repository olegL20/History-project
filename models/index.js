/**
 * Created by olegl on 04.05.2017.
 */
var fs = require('fs')
    , path = require('path')
    , Sequelize = require('sequelize')
    , lodash = require('lodash')
    , sequelize = new Sequelize('history-db', 'root', null)
    , db = {}

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db)