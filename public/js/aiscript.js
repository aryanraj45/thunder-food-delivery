var buttonstart = document.querySelector('.start') ;
const recognition = new webkitSpeechRecognition() ;
recognition.continuous = true ;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1 ;
const synth = window.speechSynthesis;
buttonstart.addEventListener('click',() => {
    recognition.start();
    utter.text="I am here to help you";
    synth.speak(utter);
    setTimeout(()=>{
        utter.text="Say pay, whenever you are ready to start the payment";
        synth.speak(utter);
    },2000);
    
})
var utter = new SpeechSynthesisUtterance("hi, how are you?") ;
utter.onend= ()=> {
    recognition.start();
    };
recognition.addEventListener('result', (e) => {
    
    let last = e.results.length - 1;
    let text = e.results[last][0].transcript;
   // console.log('Confidence: ' + e.results[0][0].confidence);
     const words = e.results[last][0].transcript.trim() ;
     console.log(words) ;
     if(words === "hello")
     {
         console.log(words) ;
         recognition.stop();
      // console.log("how are you");
       //const utter = new SpeechSynthesisUtterance("hi, how re you?") ;
       utter.text = "Hi, how are you?" ;
       synth.speak(utter) ;

     } 
     else if(words === "order pizza") {
        console.log(words);
        recognition.stop();
        utter.text = "Your order has been placed ?" ;
        synth.speak(utter);
     }
     else if(words === "pay") {
        console.log(words);
        recognition.stop();
        utter.text = "Please enter the delivery details on the next page" ;
        synth.speak(utter);

        document.getElementsByClassName('paynow-button')[0].click();
     }
     
  });
  
