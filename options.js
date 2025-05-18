document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["highlightColor"], (result) => {
    document.getElementById("highlightColor").value = result.highlightColor || "#ffff00";
  });

  document.getElementById("save").addEventListener("click", () => {
    const color = document.getElementById("highlightColor").value;
    chrome.storage.sync.set({ highlightColor: color }, () => {
      alert("Highlight color saved!");
    });
  });
});
