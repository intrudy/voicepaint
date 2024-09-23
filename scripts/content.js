
function keywrite(textarea, transcript, delay=100) {
    let i = 0
    textarea.autofocus = true

    const interval = setInterval(() => {
        if (i < transcript.length) {
            textarea.value += transcript[i]
            textarea.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true }))
            i++;
        } else {
            clearInterval(interval)
            textarea.dispatchEvent(new Event('change', { bubbles: true }))
        }
    }, delay)
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.error) {
        console.error("Runtime error: ", request.error)
        return sendResponse("Failed: ", request.error)
    }

    const msgBtn = document.querySelector('div[aria-label="Send Message"]')
    const textarea = document.querySelector('textarea[placeholder="Ask Meta AI anything..."')

    if (request.action === "write") {
        keywrite(textarea, request.data || textarea.textContent)

        msgBtn.style.pointerEvents = 'auto'
        msgBtn.removeAttribute('disabled')
        msgBtn.removeAttribute('aria-disabled')
        msgBtn.setAttribute('tabindex', '0')
        msgBtn.setAttribute('autofocus', true)
        // msgBtn.setAttribute('aria-disabled', 'false')
    }

    if (request.action === "paint") {
        msgBtn.click()
    }

    return sendResponse("OK")
})
