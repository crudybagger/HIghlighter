//This utility function takes in contents and wraps them in a span with given background colour
// let makeHighlitedNode = (contents) => {
//   let span = document.createElement('span');
//   span.style.backgroundColor = 'yellow';
//   span.appendChild(contents);
//   return span;
// };

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
    respond({ msg: 'Highlight Succesful!!' });
  }
});
