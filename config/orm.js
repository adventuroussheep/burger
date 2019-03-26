var connection = require("./connections.js");

// SQL syntax converter for updateOne orm
function objToSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}


var orm = {
    
  // to display all burgers
  selectAll: function(callBack) {
    var queryString = "SELECT * FROM  burgers";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      callBack(result);
    });
  },

  //   to add a new burger
  insertOne: function(burger, callBack) {
    var queryString = "INSERT INTO burgers (burger_name) VALUES (?)";
    connection.query(queryString, [burger], function(err, result) {
      if (err) throw err;
      callBack(result);
    });
  },

  //   to change burger to eaten
  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

module.exports = orm;
