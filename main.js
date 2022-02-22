//This utility function takes in contents and wraps them in a span with given background colour
// let makeHighlitedNode = (contents) => {
//   let span = document.createElement('span');
//   span.style.backgroundColor = 'yellow';
//   span.appendChild(contents);
//   return span;
// };

// let sendMessage = (message, callback) => {
//   chrome.runtime.sendMessage(message, (response) => {
//     callback(response);
//   });
// };
let data = {
  highlights: [],
  colors: [],
};

let initialize = () => {
  for (let i = 0; i < data.highlights.length; i++) {
    let range = data.highlights[i];
    var selectionContents = range.extractContents();
    let span = document.createElement('span');
    span.style.backgroundColor = data.colors[i];
    span.appendChild(selectionContents);
    range.insertNode(span);
  }
};

//Listen for a request from the popup to highlight
chrome.runtime.onMessage.addListener((req, sender, respond) => {
  //If the request is to highlight:
  // (this option may look unnessesary but provides a structre for multiple functionalites)
  if (req.type === 'highlight') {
    //Get the selected text
    let selectedText = window.getSelection();
    //If it is an empty selection, Return
    if (selectedText.toString() === '') return;
    //Get the location of the selected text
    // TODO: Store it like a cookie for reloads
    let range = selectedText.getRangeAt(0);
    var selectionContents = range.extractContents();
    let span = document.createElement('span');
    span.style.backgroundColor = req.color;
    span.appendChild(selectionContents);
    //TODO: Make an extra variable for colour and add the colour picker in the popup
    range.insertNode(span);
    //Responding is important, Otherwise It throws 'Recieveing end does not exists' error
    data.highlights.push(range);
    data.colors.push(req.color);
    respond({ msg: 'Highlight Succesful!!' });
  } else if (req.type === 'initialize') {
    respond(data);
  } else if (req.type === 'download') {
    console.log('Request to download');
    let txt = '';
    for (let range of data.highlights) {
      txt = txt + range.toString() + '\n\n\n';
    }
    console.log(txt);
    respond(txt);
  }
  //   console.log(data);
  //   saveInstant(data);
});
// window.localStorage.setItem('test', 'item');
// console.log(window.localStorage.getItem('test'));
