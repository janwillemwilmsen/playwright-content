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
elementDetails = []
// elementDetails = ["elementDetails"]

  for (let i = 0; i < entries.length; i++) {
    // Query for the next title element on the page
    // const title = await entries[i].$('td.title > a');
    const elementType = await entries[i].evaluate(e => e.tagName);
    const type = elementType.toLowerCase();

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
    // testExport.push(`${i + 1} {alt: ${await title}} {src: ${await href}}`)
    // testExport.push(`{alt: ${await title}, src: ${await href}}`)
    //   let allElements = (`${i + 1}: ${await title} ${await href}`);

    // console.log(`${i + 1}: ${await title} ${await href2}`);
        elementDetails.push({
            type: type,
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
// linkDetails = ["linkDetails" + ":"]
// linkDetails = [linkDetails]

  for (let i = 0; i < urlHrefs.length; i++) {
    const elementType = await urlHrefs[i].evaluate(e => e.tagName);
    const typeElement = elementType.toLowerCase();
    const type = 'linkElement'
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
    // testExport.push(`${i + 1} {alt: ${await title}} {src: ${await href}}`)
    // testExport.push(`{alt: ${await title}, src: ${await href}}`)
    //   let allElements = (`${i + 1}: ${await title} ${await href}`);

    // console.log(`${i + 1}: ${await linkTxtR} ${await href2}`);
    elementDetails.push({
            type: type,
            element: typeElement,
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
    const elementType = await headIngs[i].evaluate(e => e.tagName);
    const typeElement = elementType.toLowerCase();
    const type = 'textElement'
    // Query for the next title element on the page
    // const title = await entries[i].$('td.title > a');
    // const type = await headIngs[i].tagName;
    // const typeSort = type('tagName');

    const headingTxt = await headIngs[i].textContent();
    const headingTxtR = headingTxt.replace(/\s/g,' ').trim()
    // const type = await headIngs[i].getProperty('tagName').jsonValue();
     // const type = headingTxtR.tagName;

// if (headIngs[i].tagName ='p') { 
//     var type = 'paragraaf'
// }
// if (headIngs[i].tagName = 'h1')  { 
//     var type = 'Heading 1'
// }


    // Write the entry to the console
    // console.log(`${i + 1}: ${await title.innerText()}`);
    // testExport.push(`${i + 1} {alt: ${await title}} {src: ${await href}}`)
    // testExport.push(`{alt: ${await title}, src: ${await href}}`)
    //   let allElements = (`${i + 1}: ${await title} ${await href}`);
    // headingDetails.('h1234567')
    
    // console.log(`${i + 1}: ${await headingTxtR} `);
    elementDetails.push(
              {
                type: type,
                element: typeElement,
                headingId: i,
                headingTxt: headingTxtR,
                // linkUrl: href
              });



  }
 // END HEADINGS

// FORMS START

const formhtml = await page.$$('form');
// :::::::::::::::::::::
formDetails = []
// formDetails = ["formDetails"]

  for (let i = 0; i < formhtml.length; i++) {
    const elementType = await formhtml[i].evaluate(e => e.tagName);
    const type = elementType.toLowerCase();

    // const formcode = await formhtml[i].getAttribute('href');
    const formcode = await formhtml[i].innerHTML();
              
    // const linkTxt = await formhtml[i].textContent();
    // const linkTxtR = linkTxt.replace(/\s/g,' ').trim()

    // console.log(`${i + 1}: ${await title.innerText()}`);
    // testExport.push(`${i + 1} {alt: ${await title}} {src: ${await href}}`)
    // testExport.push(`{alt: ${await title}, src: ${await href}}`)
    //   let allElements = (`${i + 1}: ${await title} ${await href}`);

    // console.log(`${i + 1}: ${await formcode} `);
    elementDetails.push({
            type: type,
            formId: i,
            formHtmlCode: formcode
            // linkUrl: href
        });
  }
// FORMS END

// // FORMS START

const tablehtml = await page.$$('table');
// :::::::::::::::::::::
tableDetails = []
// tableDetails = ["tableDetails"]

  for (let i = 0; i < tablehtml.length; i++) {
    const elementType = await tablehtml[i].evaluate(e => e.tagName);
    const type = elementType.toLowerCase();

    // const formcode = await formhtml[i].getAttribute('href');
    const tablecode = await tablehtml[i].innerHTML();
     // console.log(`${i + 1}: ${await tablecode} `);
    elementDetails.push({
            type: type,
            tableId: i,
            tableHtmlCode: tablecode
            // linkUrl: href
        });
        // console.log(tableDetails)
  }
// FORMS END

// IFRAME START

// let innerIframehtmlArr = []

// let innerIframehtmlOuter = await page.$$('iframe');

let innerIframehtml = page.frames().map((f) => f.url())
// const backToNumbers = JSON.parse(innerIframehtml)
// console.log(backToNumbers)
// let innerIframehtml = await feedHandle.$$eval('.tweet', nodes => nodes.map(n => n.innerText)).toEqual(['Hello!', 'Hi!']);


// let innerIframehtml2 = page.frames().map((nodes) => nodes.getAttribute(src))
// console.log("frames", innerIframehtml2);




// const frameElement = await frame.frameElement();
// const contentFrame = await frameElement.contentFrame();
// console.log(frame === contentFrame);  // -> true



// innerIframehtml.push({
//   "type":"iframe",
//   "iframeHtmlCode":"peop"
// })

// innerIframehtmlArr.push({
//   all: innerIframehtml
// })
// console.log(innerIframehtmlArr);
// let iframehtml = (await innerIframehtml.getProperty('innerIframehtml'));
// console.log(innerIframehtml)
// const innerIframehtml = await frame.$eval('iframe', (e) => e.outerHTML);




// for (let i = 0; i < innerIframehtml.length; i++){
  console.log("frames", innerIframehtml);
  
  // const elementType = await innerIframehtml[i].evaluate(e => e.tagName);
  // const type = elementType.toLowerCase();
  // const innerIframehtml2 = await innerIframehtml[i].evaluate(e => e.parentNode);
  // const iframeCode = await innerIframehtml2[i].textContent();
  const type = 'iframe';
  const iframeCode = 'peop';

  // iframeCode = innerIframehtml[i].outerHTML

  elementDetails.push({
    type: type,
    // iframeId: i++,
    iframeHtmlCode: iframeCode
  })
// }

// IFRAME EIND

//   res.send({testExport});


// totalArray = linkDetails + elementDetails

// totalArray = linkDetails.concat(elementDetails).concat(headingDetails).concat(formDetails).concat(tableDetails);

// // const lll = '{links: {' + ` ${linkDetails} `+ '}}'
// const lll =  linkDetails 
// console.log(lll)

// const link = (JSON.stringify({linkDetails}));
const img =  (JSON.stringify(elementDetails));
// const head = (JSON.stringify({headingDetails}));
// const forms = (JSON.stringify({formDetails}));
// const tbl = (JSON.stringify({tableDetails}));
// console.log(link)
// console.log(img)
// console.log(head)
// console.log(forms)
// console.log(tbl)

// let totalArray = link + img
let totalArray = img
// let totalArray = link + img + head + forms + tbl



// let totalArray = link.concat(img).concat(head).concat(forms).concat(tbl);
// let totalArray = [...link, ...img, ...head, ...forms, ...tbl];

//  totalArray = [ linkDetails + elementDetails + headingDetails + formDetails + tableDetails ];
//  totalArray =  link + "," + img + "," + head + "," + forms + "," + tbl 
//  totalArray =  link + "," + img + "," + head;

//  const total = []
//  total.push({totalArray})

// totalArray = []
// totalArray = link.concat(img).concat(head)
//  totalArray =  [ link + "," + img + "," + head ];



// DEEES
//  console.log(totalArray)




// let totalArraySom = linkDetails + elementDetails + headingDetails + formDetails + tableDetails;

// losse arrays met namen per groep DEZE geeft namen in de json:::::::::::::::::::::
//  totalArray = [linkDetails, elementDetails,  headingDetails, formDetails, tableDetails];


// console.log("TotalArray uit index.js", totalArray)
// const totalArray = new Set([].concat(...totalArraySom));

// :::::::::::::::::::::
  // res.send(JSON.stringify(totalArray));
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
    