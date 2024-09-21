
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.error) {
        console.error("Runtime error: ", request.error)
        return sendResponse("Failed: ", request.error)
    }

    const msgBtn = document.querySelector('div[aria-label="Send Message"]')
    const textarea = document.querySelector('textarea[placeholder="Ask Meta AI anything..."')

    if (request.action === "write") {
        textarea.innerText = request.data || textarea.textContent
    }

    if (request.action === "paint") {
        msgBtn.click()
    }

    return sendResponse("OK")
})
