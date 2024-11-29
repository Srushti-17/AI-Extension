chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'textSelected') {
      console.log("Forwarding selected text to side panel:", message.text); 
      chrome.runtime.sendMessage({
          type: 'textSelected',
          text: message.text
      });
  }
});
