//This utility function sends the given request/message to the popup
let sendRequest = (request) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
      // These console logs are unnesesary
      console.log('sent a request to highlight the selected text');
      console.log(response.msg);
    });
  });
};

//This function sends a message to the ocntent script and requests to highlight
let requestHighlight = () => {
  //TODO Add additional parameters to the request for colour
  let request = {
    type: 'highlight',
  };
  //Send the request to content script
  sendRequest(request);
};

//Add the onClick event listner to our button
document
  .getElementById('Highlight')
  .addEventListener('click', requestHighlight);
