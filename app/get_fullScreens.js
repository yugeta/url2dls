const fs           = require("fs");
const puppeteer    = require('puppeteer');
const url2filename = require(__dirname + '/url2filename');

module.exports = async function(dir , url_lists , output_type , option){
  if(!url_lists || !url_lists.length){return;}

  option = option || {}

  // const path_chromium = '/usr/bin/chromium-browser';
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
    ua : option.ua || null
    // executablePath: path_chromium
  });
  const page = await browser.newPage();
  page.setViewport({

    width: option.width || 1200, 
    height: option.height || 800
  })

  let tm_st = global.tm_st;
  let cnt = 0;
  for(let i=0; i<url_lists.length; i++){
    if(!url_lists[i]){continue;}
    const url = url_lists[i];
    const num = ("000"+(i+1)).slice(-3);
    const output_filename = url2filename(url);
    const file = num +"_"+ output_filename + (output_type === "jpg" ? ".jpg" : '.png');
    const path = dir+'/'+ file;
    if(fs.existsSync(global.root+"/"+path)){
      console.log("- "+ num +": " + url);
      continue;
    }
    if(cnt === 0){
      await page.goto(url);
      await page.waitForNavigation({
        waitUntil:'networkidle2', 
        // waitUntil:'load', 
        timeout:3000
      })
      .catch(function(e){
        // console.log(e);
      })
    }
    else{
      await page.evaluate(function(url){
        location.href = url;
      } , url)
      .catch(function(e){

      })
      await Promise.all([
        page.waitForNavigation({waitUntil: ['load', 'networkidle2']})
      ]);
    }

    await page.screenshot({
      path     : path,
      fullPage : true
    });
    
    const tm_current = (+new Date());
    const tm = (tm_current - tm_st)/1000;
    tm_st = tm_current;
    cnt++;
    console.log("+ "+ num +": ("+ tm +" s) " + url);
  }
  await browser.close()

  return true;
};