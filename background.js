let tabCounts = {};

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "em-dash-count" && sender.tab) {
    tabCounts[sender.tab.id] = message.count;
    const color = message.count > 5 ? "#FF0000" : "#000000";
    chrome.action.setIcon({ path: "icon.png", tabId: sender.tab.id });
    chrome.action.setBadgeText({ text: message.count > 5 ? "!" : "", tabId: sender.tab.id });
    chrome.action.setBadgeBackgroundColor({ color, tabId: sender.tab.id });
  }
});