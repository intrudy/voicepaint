
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition()
recognition.lang = 'en-US'
recognition.continuous = false
recognition.maxAlternatives = 1
recognition.interimResults = false

var msgBtn = document.querySelector('div[aria-label="Send Message"]')
msgBtn.onclick = function (event) {
    console.log("Send message!")
    console.log(JSON.stringify(event, null, 2))
}

document.body.onclick = function() {
    recognition.start()
}

recognition.onerror = function(event) {
    console.log(`Speech recognition error detected: ${event.error}`)
    console.log(`Additional information: ${event.message}`)
    console.log(event)
}

recognition.onspeechend = function() {
    recognition.stop()
}

recognition.onresult = function(event) {
    console.log('Color: ' + event.results[0][0].transcript)
    console.log('Confidence: ' + event.results[0][0].confidence)

    var textarea = document.getElementById(":rl:")
    textarea.innerText = event.results[0][0].transcript
}
