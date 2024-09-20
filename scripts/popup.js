
const [startBtn] = document.getElementsByClassName('activation-button')
const [stopBtn] = document.getElementsByClassName('deactivation-button')
const [languageSelect] = document.getElementsByClassName('language-select')
const [errorMessage] = document.getElementsByClassName('error-message')


languageSelect.addEventListener('change', async function (event) {
    const [activeTab] = await chrome.tabs.query({active: true, currentWindow: true})
    const relay = await chrome.tabs.sendMessage(activeTab.id, {data: event.target.value})
    console.log("Language selection changed: ", relay)
})

startBtn.addEventListener('click', async function () {
    console.log("Start button clicked ...")
    const [activeTab] = await chrome.tabs.query({active: true, currentWindow: true})
    const relay = await chrome.tabs.sendMessage(activeTab.id, {data: "start"})
    console.log("Start button clicked: ", relay)
})

stopBtn.addEventListener('click', async function () {
    console.log("Stop button clicked ...")
    const [activeTab] = await chrome.tabs.query({active: true, currentWindow: true})
    const relay = await chrome.tabs.sendMessage(activeTab.id, {data: "stop"})
    console.log("Stop button clicked: ", relay)
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.error){
        errorMessage.textContent = request.error
    }
})
