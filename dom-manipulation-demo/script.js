const demoParagraph = document.getElementById('demo-paragraph');
const changeTextButton = document.getElementById('change-text-btn');
const output = document.getElementById('output');

changeTextButton.addEventListener('click', function() {
  demoParagraph.textContent = 'The text has been changed!'
  logAction('Changed paragraph text');
})

function logAction(action) {
  const logEntry = document.createElement('p');
  logEntry.textContent = `${new Date().toLocaleTimeString()}: ${action}`;
  output.insertBefore(logEntry, output.firstChild)
}
