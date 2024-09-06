
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition()
recognition.lang = 'en-US'
recognition.continuous = false
recognition.maxAlternatives = 1
recognition.interimResults = false


document.body.onclick = function() {
    recognition.start()
}

recognition.onerror = function(event) {
    console.log(`Speech recognition error detected: ${event.error}`)
    if (event.message !== '' && event.message.length > 0) {
        console.log(`Additional information: ${event.message}`)
    }
    console.log(event)
}

recognition.onspeechend = function() {
    recognition.stop()
}

recognition.onresult = function(event) {
    var msgBtn = document.querySelector('div[aria-label="Send Message"]')
    var textarea = document.querySelector('textarea[placeholder="Ask Meta AI anything..."')
    textarea.innerText = event.results[0][0].transcript
    msgBtn.click()
}
