const {chromium} = require('playwright-chromium');
const express = require('express');
const { getBaseUrl } = require("get-base-url");

// https://www.npmjs.com/package/pass-cors

const PORT = process.env.PORT || 8080;


const app = express();

app.use(express.static('public'))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('X-Powered-By', 'JWW');
    next();
  });
  
 
  let browser;

  app.get('/', (req, res) => {
    res.send('Hello World is this Live ??');
    console.log('what is this running on... ')
   });

   app.get('/api/', async (req, res, next) => {

    const browser = await chromium.launch({ headless: true, chromiumSandbox: false });

	// let pages;
	try {
		const url = req.query.url || 'https://essent.nl';
        const baseUrl = getBaseUrl(url)

        const context = await browser.newContext({ deviceScaleFactor: 1 });
        const page = await context.newPage();

        await page.goto(url, {
            waitUntil: "networkidle"
          });


          res.setHeader('Content-Type', 'application/json');

const entries = await page.$$('img');
// :::::::::::::::::::::
imgDetails = []
// imgDetails = ["imgDetails"]

  for (let i = 0; i < entries.length; i++) {
    // Query for the next title element on the page
    // const title = await entries[i].$('td.title > a');
    const href = await entries[i].getAttribute('src');
                var RgExp = new RegExp('^(?:[a-z]+:)?//', 'i');
                href2 = ''
                if (RgExp.test(href)) {
                    console.log ( "This is Absolute URL.")
                var href2 = href
                } else {
                    console.log(  "This is Relative URL.")
                var href2 = 'https://' + baseUrl + href
                }
    const title = await entries[i].getAttribute('alt');
    // Write the entry to the console
    // console.log(`${i + 1}: ${await title.innerText()}`);
     console.log(`${i + 1}: ${await title} ${await href2}`);
    // testExport.push(`${i + 1} {alt: ${await title}} {src: ${await href}}`)
    // testExport.push(`{alt: ${await title}, src: ${await href}}`)
//   let allElements = (`${i + 1}: ${await title} ${await href}`);
        imgDetails.push({
            imgId: i,
            alt: title,
            src: href2
        });
  }
// END IMAGES 
// START HEADINGS
const urlHrefs = await page.$$('a, button');
// :::::::::::::::::::::
linkDetails = []
// linkDetails = ["linkDetails"]

  for (let i = 0; i < urlHrefs.length; i++) {
    const href = await urlHrefs[i].getAttribute('href');
   
          if(!href){
            href2 = '/#'
            }
            else {
              href2 = href
            }
    const linkTxt = await urlHrefs[i].textContent();
    const linkTxtR = linkTxt.replace(/\s/g,' ').trim()
    // console.log(`${i + 1}: ${await title.innerText()}`);
     console.log(`${i + 1}: ${await linkTxtR} ${await href2}`);
    // testExport.push(`${i + 1} {alt: ${await title}} {src: ${await href}}`)
    // testExport.push(`{alt: ${await title}, src: ${await href}}`)
//   let allElements = (`${i + 1}: ${await title} ${await href}`);
linkDetails.push({
            linkId: i,
            linkTxt: linkTxtR,
            linkUrl: href2
        });
  }
// END HEADINGS



// START HEADINGS
// var regex = new RegExp('<\/?h[1-6]>','ig');

// (?i)<h([1-6].*?)>(.*?)</h([1-6])>

// const headIngs = await page.$$('h[1-6]>','ig');
const headIngs = await page.$$("h1, h2, h3, h4, h5, h6, p");
// :::::::::::::::::::::
headingDetails = []
// headingDetails = ["headingDetails"]

  for (let i = 0; i < headIngs.length; i++) {
    // Query for the next title element on the page
    // const title = await entries[i].$('td.title > a');
    // const type = await headIngs[i].tagName;
    // const typeSort = type('tagName');

    const headingTxt = await headIngs[i].textContent();
    const headingTxtR = headingTxt.replace(/\s/g,' ').trim()
    // const type = await headIngs[i].getProperty('tagName').jsonValue();
       const type = await headIngs[i].evaluate(e => e.tagName);
    // const type = headingTxtR.tagName;

// if (headIngs[i].tagName ='p') { 
//     var type = 'paragraaf'
// }
// if (headIngs[i].tagName = 'h1')  { 
//     var type = 'Heading 1'
// }


    // Write the entry to the console
    // console.log(`${i + 1}: ${await title.innerText()}`);
     console.log(`${i + 1}: ${await headingTxtR} `);
    // testExport.push(`${i + 1} {alt: ${await title}} {src: ${await href}}`)
    // testExport.push(`{alt: ${await title}, src: ${await href}}`)
//   let allElements = (`${i + 1}: ${await title} ${await href}`);
// headingDetails.('h1234567')
headingDetails.push(
            // "NaamVanDataNodesH1H2H3H4H5H6", 
            {
            headingId: i,
            type: type,
            headingTxt: headingTxtR,
            // linkUrl: href
        });
  }
//   console.log(headingDetails)
// END HEADINGS

// FORMS START

const formhtml = await page.$$('form');
// :::::::::::::::::::::
formDetails = []
// formDetails = ["formDetails"]

  for (let i = 0; i < formhtml.length; i++) {
    // const formcode = await formhtml[i].getAttribute('href');
    const formcode = await formhtml[i].innerHTML();
              
    // const linkTxt = await formhtml[i].textContent();
    // const linkTxtR = linkTxt.replace(/\s/g,' ').trim()

    // console.log(`${i + 1}: ${await title.innerText()}`);
     console.log(`${i + 1}: ${await formcode} `);
    // testExport.push(`${i + 1} {alt: ${await title}} {src: ${await href}}`)
    // testExport.push(`{alt: ${await title}, src: ${await href}}`)
//   let allElements = (`${i + 1}: ${await title} ${await href}`);
formDetails.push({
            formId: i,
            formHtmlCode: formcode
            // linkUrl: href
        });
  }
// FORMS END

// FORMS START

const tablehtml = await page.$$('table');
// :::::::::::::::::::::
tableDetails = []
// tableDetails = ["tableDetails"]

  for (let i = 0; i < formhtml.length; i++) {
    // const formcode = await formhtml[i].getAttribute('href');
    const tablecode = await tablehtml[i].innerHTML();
              
    // const linkTxt = await formhtml[i].textContent();
    // const linkTxtR = linkTxt.replace(/\s/g,' ').trim()

    // console.log(`${i + 1}: ${await title.innerText()}`);
     console.log(`${i + 1}: ${await tablecode} `);
    // testExport.push(`${i + 1} {alt: ${await title}} {src: ${await href}}`)
    // testExport.push(`{alt: ${await title}, src: ${await href}}`)
//   let allElements = (`${i + 1}: ${await title} ${await href}`);
tableDetails.push({
            tableId: i,
            tableHtmlCode: tablecode
            // linkUrl: href
        });
  }
// FORMS END

//   res.send({testExport});


// totalArray = linkDetails + imgDetails
totalArray= linkDetails.concat(imgDetails).concat(headingDetails).concat(formDetails).concat(tableDetails);
//  totalArray = [ linkDetails + imgDetails + headingDetails + formDetails + tableDetails ];
// let totalArraySom = linkDetails + imgDetails + headingDetails + formDetails + tableDetails;

// losse arrays met namen per groep DEZE geeft namen in de json:::::::::::::::::::::
//  totalArray = [linkDetails, imgDetails,  headingDetails, formDetails, tableDetails];


// console.log("TotalArray uit index.js", totalArray)
// const totalArray = new Set([].concat(...totalArraySom));

// :::::::::::::::::::::
  // res.send(JSON.stringify({totalArray}));
  res.send(totalArray);
 

  // res.send('jsonnn');
  res.end();

  await page.close();
  await browser.close();

    } catch (error) {

		// Output an error if it occurred
		console.error(error.message);


    }
    // }     /////end van Async 
     
    
    });
      
    app.listen(PORT);
    console.log(`Running on :${PORT}`);
    