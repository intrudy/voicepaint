
/**

accelerometer=(),
attribution-reporting=(),
autoplay=(),
bluetooth=(),
camera=(),
ch-device-memory=(),
ch-downlink=(),
ch-dpr=(),
ch-ect=(),
ch-rtt=(),
ch-save-data=(),
ch-ua-arch=(),
ch-ua-bitness=(),
ch-viewport-height=(),
ch-viewport-width=(),
ch-width=(),
clipboard-read=(),
clipboard-write=(),
compute-pressure=(),
display-capture=(self),
encrypted-media=(),
fullscreen=(self),
gamepad=(),
geolocation=(),
gyroscope=(),
hid=(),
idle-detection=(),
interest-cohort=(),
keyboard-map=(),
local-fonts=(),
magnetometer=(),
microphone=(),
midi=(),
otp-credentials=(),
payment=(),
picture-in-picture=(),
private-state-token-issuance=(),
publickey-credentials-get=(),
screen-wake-lock=(),
serial=(),
shared-storage=(),
shared-storage-select-url=(),
private-state-token-redemption=(),
usb=(),
unload=(self),
window-management=(),
xr-spatial-tracking=();

report-to="permissions_policy"
 */
chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
        {
            id: 1,
            priority: 1,
            action: {
                type: "modifyHeaders",
                requestHeaders: [
                    {
                        operation: "set",
                        header: "Permissions-Policy",
                        value: "microphone=(self)"
                    }
                ]
            },
            condition: {
                urlFilter: "*",
                initiatorDomains: "meta.ai"
            },
        }
    ],
})
