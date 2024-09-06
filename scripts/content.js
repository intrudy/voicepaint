
const recognition = new webkitSpeechRecognition()
recognition.lang = 'en-US'
recognition.continuous = false
recognition.interimResults = false

const speakBtn = document.createElement("button")
speakBtn.id = "speechToTextspeakBtn"
speakBtn.textContent = "🎙️"
speakBtn.style.position = "fixed"
speakBtn.style.bottom = "20px"
speakBtn.style.right = "20px"
speakBtn.style.zIndex = "10000"
speakBtn.style.background = "#000"
speakBtn.style.color = "#fff"
speakBtn.style.border = "none"
speakBtn.style.borderRadius = "50%"
speakBtn.style.width = "50px"
speakBtn.style.height = "50px"
speakBtn.style.fontSize = "24px"
speakBtn.style.cursor = "pointer"
speakBtn.style.display = "block"
document.body.appendChild(speakBtn)

speakBtn.onclick = function () {
    navigator.webkitGetUserMedia(
        {audio: true},
        (stream) => recognition.start(),
        (err) => window.alert("Cannot record speech, please allow microphone")
    )
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
