const puppeteer    = require('puppeteer');
const url2filename = require(__dirname + '/url2filename');

module.exports = async function(num , dir , url){
  if(!url){return;}
  
  num = ("000"+num).slice(-3);
  const output_filename = url2filename(url);

  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  page.setViewport({
    width: 1200, 
    height: 800
  })
  await page.goto(url);
  await page.waitForNavigation({waitUntil:'networkidle2', timeout:10000}).catch(e => console.log('timeout exceed. proceed to next operation'))
  await page.screenshot({
    path     : dir+'/'+ num +"_"+ output_filename +'.png', 
    fullPage : true
  })
  // console.log("- screenshot: " + url)
  await browser.close()

  return true;
};