/**
* 指定のパスのディレクトリを作成する（ネストが複数あっても自動作成できる）
*/

var fs        = require('fs');
var pathexist = require(__dirname + "/path_exist.js");

module.exports = function MAIN(path){
  if(!path){return;}
  var sp = path.split("/");
  var p = "";
  for(var i=0; i<sp.length; i++){
    if(!sp[i]){continue;}
    p += sp[i] + "/";
    if(pathexist(p) === false){
      fs.mkdirSync(p);
    }
  }
  return "success";
};

