
const errTag = document.getElementById('err')
const recognition = new webkitSpeechRecognition()

recognition.lang = 'en-US'
recognition.continuous = true
recognition.interimResults = true

recognition.onerror = function(event) {
    console.log(`Speech recognition error detected: ${event.error}`)
    if (event.message !== '' && event.message.length > 0) {
        console.log(`Additional information: ${event.message}`)
    }
    errTag.textContent = event.error.message ?? event.error
}

recognition.onresult = async function(event) {
    const transcripts = Object.values(event.results)
                              .map(rs => Object.values(rs).map(item => item.transcript))
                              .reduce((agg, curr) => agg + ' ' + curr, "")
    const [activeTab] = await chrome.tabs.query({active: true, currentWindow: true})
    chrome.tabs.sendMessage(activeTab.id, {data: transcripts, action: "write"}, function(response) {})
}

document.getElementById('languages').addEventListener('change', async function (event) {
    recognition.lang = event.target.value
})

document.getElementById('start').addEventListener('click', async function() {
    navigator.webkitGetUserMedia(
        {audio: true},
        (stream) => recognition.start(),
        (err) => window.alert("Cannot record speech, please allow microphone")
    )
})

document.getElementById('stop').addEventListener('click', async function() {
    recognition.stop()
    const [activeTab] = await chrome.tabs.query({active: true, currentWindow: true})
    chrome.tabs.sendMessage(activeTab.id, {data: "", action: "paint"}, function(response) {})
    console.log("Speech recording stopped.")
})
