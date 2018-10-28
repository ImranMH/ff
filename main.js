const synth = window.speechSynthesis
const InputForm = document.querySelector('#form')
const textValue = document.querySelector('.txt')
const selectVoice = document.querySelector('select')

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitchValue');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rateValue');
var volume = document.querySelector('#volume');
var volumeValue = document.querySelector('.volumeValue');
 const talking_window = document.querySelector('.talkingGuy')
 var voices = []


function populateVoiceList() {
  voices = synth.getVoices()
    pitchValue.textContent = pitch.value *50
    rateValue.textContent = rate.value *50
    volumeValue.textContent = volume.value * 100
  for (let i = 0; i < voices.length; i++){
    var option = document.createElement('option')
    option.textContent = voices[i].name + '(' + voices[i].lang+ ')'
    if(voices[i].default) {
      option.textContent += " -- DEFAULT"
    }
    option.setAttribute('data-name', voices[i].name)
    option.setAttribute('data-lang', voices[i].lang)
    selectVoice.appendChild(option)
  }
}

populateVoiceList()
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList
}


const synthasizerfunc = function(e) {
  e.preventDefault()
    var speak = new SpeechSynthesisUtterance(textValue.value)
    if (synth.speaking) {
      console.log("wait for speaking to end before")
      return
    }
   if (textValue.value === "") {
     console.log("please wrrite somethig before")
     return
   }

  var selectedOption = selectVoice.selectedOptions[0].getAttribute('data-name')
  console.log(speak)
  for (var i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      speak.voice= voices[i]
    }
  }
   speak.pitch = pitch.value
   speak.rate = rate.value
   speak.volume = volume.value

  synth.speak(speak)

  
  speak.onend = () => {
    console.log('speaking ended');
    setTimeout(() => {
       talking_window.style.backgroundColor = '#000'
      talking_window.style.backgroundImage = 'none'
    }, 200);
     
  }
  speak.onerror = () => {
    console.log('something bad happend');
  }
  speak.onstart = () => {
   
    talking_window.style.backgroundImage = 'url(images/giphy.gif)'
    console.log('speaking will start now ');
  }
  textValue.blur()
}

const changePitchEvent = (e)=>{ 
  pitchValue.textContent = pitch.value *50
}
const changeRateEvent = (e) => {
  rateValue.textContent = rate.value *50
}
const changeVolume = (e) => {
  volumeValue.textContent = volume.value *100
}
InputForm.addEventListener('submit', synthasizerfunc) 
// e => {
//    e.preventDefault()
//   synthasizerfunc()
//   textValue.blur()
// } )
selectVoice.addEventListener('change', synthasizerfunc)
pitch.addEventListener('change', changePitchEvent)
rate.addEventListener('change', changeRateEvent)
volume.addEventListener('change', changeVolume)