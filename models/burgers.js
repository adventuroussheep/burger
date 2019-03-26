var orm = require("../config/orm.js");


// orm handler
var burger = {
    selectAll: function(callBack){
        orm.selectAll(function(res){
            callBack(res);
        })
    },
    insertOne: function(burger, callBack){
        orm.insertOne(burger, function(res){
            callBack(res);
        })
    },
    updateOne: function(id, condition, cb){
        orm.updateOne("burgers", id, condition, cb, function(res){
            cb(res);
        })
    }
}

module.exports = burger;