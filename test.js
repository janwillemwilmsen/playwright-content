// TEST script - start playwright log elements. Trying to find element which have no children.... uhhhhh 

const {chromium} = require('playwright-chromium');

async function start() {
const browser = await chromium.launch({ headless: false, chromiumSandbox: false });

try {
const url = 'https://essent.nl/zon';
// const url = 'https://quotes.toscrape.com/random';
        const context = await browser.newContext({ deviceScaleFactor: 1 });
        const page = await context.newPage();

        await page.goto(url, {
            waitUntil: "networkidle"
          });
 
const headIngs = await page.$$("h1, h2, h3, h4, h5, h6, p");
elementDetails = []

// for (let i = 0; i < headIngs.length; i++) {
// const elementType = await headIngs[i].evaluate(e => e.tagName);
// const typeElement = elementType.toLowerCase();
// const type = 'textElement'
// const headingTxt = await headIngs[i].textContent();
// const headingTxtRegex = headingTxt.replace(/\s/g,' ').trim()

//     elementDetails.push(
//     {
//         type: type,
//         element: typeElement,
//         headingId: i,
//         headingTxt: headingTxtRegex,
//     });
//     }
// console.log(elementDetails)
////////////////////////////////////////////////////////


const snapshot = await page.accessibility.snapshot();
console.log(snapshot);



///////////////////////////////////////////
const divArray = []
// const divElements = await page.$$("div", {'div:not(:has(*))'});
const divElements = await page.$$("div");

//     for(var i = 0; i < divElements.length; i++){
//     // console.log(i)
//        const divTxt = await divElements[i].innerHTML();
       
//        console.log('divs --',divTxt)

// //     // page.locator('article', { has: page.locator('button.subscribe') })
// //     // var moreEmptyAs = $('a:not(:has(*))');

// //     // const myElement = await page.$$("div");
// //     // for (var i = 0; i < myElement.children.length; i++) {
// //     //   console.log(myElement.children[i].tagName);
// //     // }

// //     //  var emptyAs = $i.filter(function () {
// //     //  return $(this).children().length == 0;
// //     //         });
// //     //  console.log(emptyAs)       
//     }
await page.close();
await browser.close();


    } catch (error) {
        console.error(error.message);
            }
}
start()