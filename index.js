const fs              = require("fs");
const get_fullScreen  = require(__dirname + "/app/get_fullScreen.js");
const get_fullScreens = require(__dirname + "/app/get_fullScreens.js");
const mkdir           = require(__dirname + '/app/mkdir.js');
const argv            = require(__dirname + '/app/argv.js');

(async function(){
  global.root  = __dirname;
  global.tm_st = (+new Date());

  if(!Object.keys(argv.options).length){
    const help = fs.readFileSync(__dirname +"/README.md" , "utf-8");
    console.log("\n"+help+"\n");
    process.exit(0);
  }

  // url-lists
  let list_path = "";
  let url_lists = [];
  if(argv.options["f"]){
    list_path = argv.options["f"];
  }
  else if(argv.options["file"]){
    list_path = argv.options["file"];
  }
  if(list_path){
    if(!fs.existsSync(list_path)){
      console.log("Error ! Not found url-list-file. : "+ list_path);
      process.exit(0)
    }
    const url_lists_text = fs.readFileSync(list_path , "utf-8");
    if(!url_lists_text){
      console.log("Error ! No url-list data.");
      process.exit(0)
    }
    url_lists = url_lists_text.split("\n");
  }
  if(argv.options["url"]){
    url_lists = [argv.options["url"]];
  }
  

  // output-dir
  let output = "output";
  mkdir(output);

  // output-type
  const output_type = argv.options.type === "jpg" || argv.options.type === "jpeg" ? "jpg" : "png";


  // offset
  let offset = argv.options.offset ? Number(argv.options.offset)-1 : 0;
  if(offset < 0){
    offset = 0;
  }

  // capture
  url_lists = typeof url_lists === "string" ? [url_lists] : url_lists;
  await get_fullScreens(output , url_lists , output_type);

  console.log("Finished !! ("+ (((+new Date()) - global.tm_st)/1000) +" s)");
})()
