document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('name');
  const ageInput = document.getElementById('age');
  const addButton = document.getElementById('add-button');
  const userList = document.getElementById('user-list');
  let users = JSON.parse(localStorage.getItem('users')) || [];

  function renderUsers() {
    userList.innerHTML = '';
    users.forEach((user, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td class="actions">
          <button class="edit-button" onclick="editUser(${index})">Edit</button>
          <button class="delete-button" onclick="deleteUser(${index})">Delete</button>
        </td>
      `;
      userList.appendChild(row);
    });
  }

  function addUser() {
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value.trim());
    if (name && age) {
      users.push({ name, age });
      localStorage.setItem('users', JSON.stringify(users));
      renderUsers();
      nameInput.value = '';
      ageInput.value = '';
    }
  }

  function editUser(index) {
    const user = users[index];
    nameInput.value = user.name;
    ageInput.value = user.age;
    addButton.textContent = 'Update';
    addButton.onclick = () => updateUser(index);
  }

  function updateUser(index) {
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value.trim());
    if (name && age) {
      users[index] = { name, age };
      localStorage.setItem('users', JSON.stringify(users));
      renderUsers();
      nameInput.value = '';
      ageInput.value = '';
      addButton.textContent = 'Add';
      addButton.onclick = addUser;
    }
  }

  function deleteUser(index) {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    renderUsers();
  }

  addButton.onclick = addUser;
  renderUsers();
});

// Make functions globally accessible
window.editUser = function(index) {
  const nameInput = document.getElementById('name');
  const ageInput = document.getElementById('age');
  const addButton = document.getElementById('add-button');
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users[index];
  nameInput.value = user.name;
  ageInput.value = user.age;
  addButton.textContent = 'Update';
  addButton.onclick = () => {
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value.trim());
    if (name && age) {
      users[index] = { name, age };
      localStorage.setItem('users', JSON.stringify(users));
      document.getElementById('user-list').innerHTML = '';
      users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.age}</td>
          <td class="actions">
            <button class="edit-button" onclick="editUser(${index})">Edit</button>
            <button class="delete-button" onclick="deleteUser(${index})">Delete</button>
          </td>
        `;
        document.getElementById('user-list').appendChild(row);
      });
      nameInput.value = '';
      ageInput.value = '';
      addButton.textContent = 'Add';
      addButton.onclick = addUser;
    }
  };
};

window.deleteUser = function(index) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.splice(index, 1);
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('user-list').innerHTML = '';
  users.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.age}</td>
      <td class="actions">
        <button class="edit-button" onclick="editUser(${index})">Edit</button>
        <button class="delete-button" onclick="deleteUser(${index})">Delete</button>
      </td>
    `;
    document.getElementById('user-list').appendChild(row);
  });
};
