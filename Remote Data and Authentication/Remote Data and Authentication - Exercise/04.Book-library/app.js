function bookLibrary() {
  const url = 'http://localhost:3030/jsonstore/collections/books';

  const loadButton = document.getElementById('loadBooks');
  const tBodyElements = document.getElementsByTagName('tbody')[0];
  const formElements = document.getElementsByName('form')[0];
  loadButton.addEventListener('click', onClickLoad);

  async function onClickLoad(){
    const response = await fetch(url);
    const data = await response.json();
    
   let entries = Object.entries(data);
    tBodyElements.innerHTML = '';

    for (const [key, {author, title}] of entries) {
      let trElement = document.createElement('tr');
      let tdTitleElement = document.createElement('td');
      let tdAuthorElement = document.createElement('td');

      tdTitleElement.textContent = title;
      tdAuthorElement.textContent = author;

      trElement.appendChild(tdTitleElement);
      trElement.appendChild(tdAuthorElement);

      let buttonTd = document.createElement('td');
      let editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', remove);

      buttonTd.appendChild(editButton);
      buttonTd.appendChild(deleteButton);
      trElement.appendChild(buttonTd);
      tBodyElements.appendChild(trElement);

      function remove(event){
        event.preventDefault()
        fetch(`${url}/${key}`,{
          method: 'DELETE'
        })
        
        trElement.remove()
      }
    }
  }
}
bookLibrary()