// Function to add a new code snippet
function addSnippet(snippetName, snippetCode) {
    const newSnippet = {
      id: Date.now(),
      name: snippetName,
      code: snippetCode,
    };
  
    // Get existing snippets from local storage
    const existingSnippets = JSON.parse(localStorage.getItem('snippets')) || [];
    // Add the new snippet to the array
    existingSnippets.push(newSnippet);
    // Save the updated snippets array back to local storage
    localStorage.setItem('snippets', JSON.stringify(existingSnippets));
  
    displaySnippets();
  }
  
  // Function to delete a code snippet
  function deleteSnippet(id) {
    let existingSnippets = JSON.parse(localStorage.getItem('snippets')) || [];
    // Filter out the snippet to be deleted
    existingSnippets = existingSnippets.filter(snippet => snippet.id !== id);
    // Save the updated snippets array back to local storage
    localStorage.setItem('snippets', JSON.stringify(existingSnippets));
  
    displaySnippets();
  }
  
  // Function to update a code snippet
  function updateSnippet(id, snippetName, snippetCode) {
    let existingSnippets = JSON.parse(localStorage.getItem('snippets')) || [];
    const snippetToUpdate = existingSnippets.find(snippet => snippet.id === id);
    if (snippetToUpdate) {
      snippetToUpdate.name = snippetName;
      snippetToUpdate.code = snippetCode;
      // Save the updated snippets array back to local storage
      localStorage.setItem('snippets', JSON.stringify(existingSnippets));
  
      displaySnippets();
    }
  }
  
  // Function to get snippets from local storage and display them on the page
  function displaySnippets() {
    const snippetsContainer = document.getElementById('snippets');
    snippetsContainer.innerHTML = '';
  
    const existingSnippets = JSON.parse(localStorage.getItem('snippets')) || [];
    existingSnippets.forEach(snippet => {
      const snippetElement = document.createElement('div');
      snippetElement.className = 'snippet';
  
      const nameElement = document.createElement('h3');
      nameElement.innerText = snippet.name;
  
      const codeElement = document.createElement('pre');
      codeElement.innerText = snippet.code;
  
      const editButton = document.createElement('button');
      editButton.innerText = 'Edit';
      editButton.addEventListener('click', () => showEditForm(snippet.id, snippet.name, snippet.code));
  
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', () => deleteSnippet(snippet.id));
  
      snippetElement.appendChild(nameElement);
      snippetElement.appendChild(codeElement);
      snippetElement.appendChild(editButton);
      snippetElement.appendChild(deleteButton);
  
      snippetsContainer.appendChild(snippetElement);
    });
  }
  
  // Load and display snippets when the page is loaded
  document.addEventListener('DOMContentLoaded', displaySnippets);



// Handle form submission
const snippetForm = document.getElementById('snippetForm');
snippetForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const snippetName = document.getElementById('snippetName').value;
  const snippetCode = document.getElementById('snippetCode').value;

  addSnippet(snippetName, snippetCode);

  // Clear form fields
  document.getElementById('snippetName').value = '';
  document.getElementById('snippetCode').value = '';
});


// Edit Form
function showEditForm(id, snippetName, snippetCode) {
    const editForm = document.createElement('form');
    editForm.id = 'editForm';
  
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'editSnippetName';
    nameInput.placeholder = 'Snippet Name';
    nameInput.required = true;
    nameInput.value = snippetName;
  
    const codeInput = document.createElement('textarea');
    codeInput.id = 'editSnippetCode';
    codeInput.placeholder = 'Snippet Code';
    codeInput.required = true;
    codeInput.value = snippetCode;
  
    const updateButton = document.createElement('button');
    updateButton.type = 'submit';
    updateButton.innerText = 'Update';
  
    editForm.appendChild(nameInput);
    editForm.appendChild(codeInput);
    editForm.appendChild(updateButton);
  
    const snippetsContainer = document.getElementById('snippets');
    snippetsContainer.innerHTML = '';
    snippetsContainer.appendChild(editForm);
  
    // Hide "Add Snippet" form
    document.getElementById('snippetForm').style.display = 'none';
  
    // Handle edit form submission
    editForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const updatedSnippetName = document.getElementById('editSnippetName').value;
      const updatedSnippetCode = document.getElementById('editSnippetCode').value;
  
      updateSnippet(id, updatedSnippetName, updatedSnippetCode);
  
      // Clear form and show the snippets and "Add Snippet" form again
      document.getElementById('snippetForm').reset();
      document.getElementById('snippetForm').style.display = 'block';
      displaySnippets(snippets);
    });
  }

function clearAllSnippets() {
    localStorage.removeItem('snippets');
    displaySnippets(); // To refresh the displayed snippets after clearing local storage
  }
  
  // Add event listener for the "Clear All" button
  const clearAllButton = document.getElementById('clearAllButton');
  clearAllButton.addEventListener('click', clearAllSnippets);