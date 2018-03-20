var mysql = require('sql');
var connection = mysql.createConnection({
    host    : 'my_host',
    user    : 'jef',
    password: 'leponot',
    database: 'tests'
});

connection.connect(function(err){
   if (err) {
    console.log('error connecting: ' + err.stack);
    return;
   }
   console.log('connection ok');
});

connection.query("SELECT id_scenario FROM tb_scenario WHERE name=?","scenario_test_authentification",function(data){
      connection.query("INSERT INTO replay ('id_replay','id_scenario','date','state') VALUES('',?,Now(),?);",[data.id_scenario,"OK"],function(insert){
    connection.end();
   });
});

phantom.exit();