// const texts=['We Innovate','We Create','We make it Better'];
// let count =0;
// let index=0;
// let currentText="";
// let letter="";

// (function type(){
//     if(count === texts.length){
//     count=0;
// }
// currentText=texts[count];
// letter=currentText.slice(0,++index);
// document.quuerySelector(".txt-type").textContent=letter;
// if(letter.length===currentText.length){
//     count++;
//     index=0;
// }
// setTimeout(type,400);
// }
// )();

// class TypeWriter {
//     constructor(txtElement, words, wait = 3000) {
//       this.txtElement = txtElement;
//       this.words = words;
//       this.txt = '';
//       this.wordIndex = 0;
//       this.wait = parseInt(wait, 10);
//       this.type();
//       this.isDeleting = false;
//     }
  
//     type() {
//       // Current index of word
//       const current = this.wordIndex % this.words.length;
//       // Get full text of current word
//       const fullTxt = this.words[current];
  
//       // Check if deleting
//       if(this.isDeleting) {
//         // Remove char
//         this.txt = fullTxt.substring(0, this.txt.length - 1);
//       } else {
//         // Add char
//         this.txt = fullTxt.substring(0, this.txt.length + 1);
//       }
  
//       // Insert txt into element
//       this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
//       // Initial Type Speed
//       let typeSpeed = 300;
  
//       if(this.isDeleting) {
//         typeSpeed /= 2;
//       }
  
//       // If word is complete
//       if(!this.isDeleting && this.txt === fullTxt) {
//         // Make pause at end
//         typeSpeed = this.wait;
//         // Set delete to true
//         this.isDeleting = true;
//       } else if(this.isDeleting && this.txt === '') {
//         this.isDeleting = false;
//         // Move to next word
//         this.wordIndex++;
//         // Pause before start typing
//         typeSpeed = 500;
//       }
  
//       setTimeout(() => this.type(), typeSpeed);
//     }
//   }
  
  
//   // Init On DOM Load
//   document.addEventListener('DOMContentLoaded', init);
  
//   // Init App
//   function init() {
//     const txtElement = document.querySelector('.txt-type');
//     const words = JSON.parse(txtElement.getAttribute('data-words'));
//     const wait = txtElement.getAttribute('data-wait');
//     // Init TypeWriter
//     new TypeWriter(txtElement, words, wait);
//   }
document.addEventListener('DOMContentLoaded',function(event){
  // array with texts to type in typewriter
  var dataText = [ "Amsterdam.", "Full Service.", "Webdevelopment.", "Wij zijn Occhio!"];
  
  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < (text.length)) {
      // add next character to h1
     document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback)
      }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 700);
    }
  }
  // start a typewriter animation for a text in the dataText array
   function StartTextAnimation(i) {
     if (typeof dataText[i] == 'undefined'){
        setTimeout(function() {
          StartTextAnimation(0);
        }, 20000);
     }
     // check if dataText[i] exists
    if (i < dataText[i].length) {
      // text exists! start typewriter animation
     typeWriter(dataText[i], 0, function(){
       // after callback (and whole text has been animated), start next text
       StartTextAnimation(i + 1);
     });
    }
  }
  // start the text animation
  StartTextAnimation(0);
});


