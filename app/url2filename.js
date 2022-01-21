module.exports = function(url){
  if(!url){return null;}
  if(!url.match(/^http(s*?)\:\/\/(.+?)$/)){return null;}
  const sp = url.split("/");
  const filename = sp[0].replace(":","") +"_"+ (sp.slice(2).join("_").replace(/\./g,"_"));
  return filename || "noname_"+(+new Date());
};