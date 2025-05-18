(async () => {
  const color = (await chrome.storage.sync.get(["highlightColor"]))?.highlightColor || "yellow";
  const emDashes = Array.from(document.body.querySelectorAll("*:not(script):not(style)"));
  let count = 0;

  const emDashRegex = /(—|⸺|\u2014|&mdash;|&#x2014;|&#8212;|\\2014|&#11834;|&#x2E3A;|U+2E3A)/g;

  emDashes.forEach(node => {
    if (node.childNodes.length) {
      node.childNodes.forEach(child => {
        if (child.nodeType === 3 && emDashRegex.test(child.nodeValue)) {
          const replaced = child.nodeValue.replace(emDashRegex, '<span class="em-dash-highlight">$1</span>');
          const span = document.createElement("span");
          span.innerHTML = replaced;
          node.replaceChild(span, child);
          count += (child.nodeValue.match(emDashRegex) || []).length;
        }
      });
    }
  });

  const style = document.createElement("style");
  style.textContent = `.em-dash-highlight { background-color: ${color}; }`;
  document.head.appendChild(style);

  chrome.runtime.sendMessage({ type: "em-dash-count", count });
})();