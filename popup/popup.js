//initialization function, Runs everytime the pop up opens
//This is nessesary as everytime the pop up opens, It is entirely new
let initialize = () => {
  let request = {
    type: 'initialize',
  };
};

//This utility function sends the given request/message to the popup
let sendRequest = (request, callback) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
      callback(response);
    });
  });
};

//This function sends a message to the ocntent script and requests to highlight
let requestHighlight = () => {
  let color = document.getElementById('highlight-color').value;
  //TODO Add additional parameters to the request for colour
  let request = {
    type: 'highlight',
    color: color,
  };
  //Send the request to content script
  sendRequest(request, () => {});
};

//Add the onClick event listner to our button
document
  .getElementById('Highlight')
  .addEventListener('click', requestHighlight);

initialize();
