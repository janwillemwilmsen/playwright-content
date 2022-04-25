    // Get the button
   // const body = document.getElementsByTagName('body');
const mybutton = document.getElementById("btn-back-to-top");
hideScrollButton()
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
   scrollFunction();
};

function hideScrollButton(){
    mybutton.style.display = 'none'
}

function showScrollButton(){
    mybutton.style.display = 'block'
}

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener('click', backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}