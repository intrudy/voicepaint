
async function speak() {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.tabs.sendMessage(activeTab.id, { command: "speak" })
}

chrome.action.onClicked.addListener(() => {
    speak()
})

chrome.commands.onCommand.addListener((cmd) => {
    if (cmd === 'speak') {
        speak()
    }
})
