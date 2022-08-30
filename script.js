const textarea = document.getElementById("text");
let voicelist = document.getElementById("voice");
let speechbtn = document.getElementById("submit");

let synth = speechSynthesis;
let isSpeaking = true;

function voicespeech() {
  for (let voice of synth.getVoices()) {
    let option = document.createElement("option");
    option.text = voice.name;
    voicelist.add(option);
  }
}

synth.addEventListener("voiceschanged", voicespeech);

function textToSpeech(text) {
  let utternance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name === voicelist.value) {
      utternance.voice = voice;
    }
  }
  speechSynthesis.speak(utternance);
}

speechbtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value !== "") {
    if (!synth.speaking) {
      textToSpeech(textarea.value);
    }
    if (textarea.value.length > 80) {
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechbtn.innerHTML = "Pause Speech";
      } else {
        synth.pause();
        isSpeaking = true;
        speechbtn.innerHTML = "Resume Speech";
      }
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechbtn.innerHTML = "Conver To Speech";
        }
      });
    } else {
      speechbtn.innerHTML = "Convert To Speech";
    }
  }
});
