let list = document.getElementById('list');
let searchBtn = document.getElementById('searchBtn');
let searchInput = document.getElementById('searchInput');
let contacts = [];

async function printData() {
  let res = await fetch('https://randomuser.me/api/?results=10');
  let { results } = await res.json();
  contacts = results;

  displayContacts(results);
}

function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function displayContacts(results) {
  list.innerHTML = '';
  results.forEach(contact => {
    let li = document.createElement('li');
    li.innerHTML = `<div>
                      <img src="${contact.picture.large}" alt="${contact.name.first}">
                      <h2>${contact.name.first} ${contact.name.last}</h2>
                      <h3>${contact.cell}</h3>
                      <span>${contact.email}</span>
                      <p>${contact.location.city} - ${contact.location.state}</p>
                      <button>${contact.location.country}</button>
                    </div>`;
    list.appendChild(li);
  });
}

function searchContacts() {
  let searchTerm = normalizeString(searchInput.value);
  let filteredContacts = contacts.filter(contact => 
    normalizeString(contact.name.first).includes(searchTerm) || normalizeString(contact.name.last).includes(searchTerm)
  );
  
  displayContacts(filteredContacts);
}

searchBtn.addEventListener('click', searchContacts);

searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    searchContacts();
  }
});

printData();
