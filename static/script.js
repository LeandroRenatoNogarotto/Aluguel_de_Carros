function addCarro(carro) {
  let item = document.createElement('tr');
  let id = carro.id;
  item.classList.add(`tr${id}`);
  item.classList.add(`tbody_tr`);
  item.innerHTML =
    `<th>${id}</th>
    <td> ${carro.modelo} </td>
    <td> ${carro.marca} </td> 
    <td> ${carro.ano} </td>
    <td>R$${carro.vDiaria}</td>
    <td class="td${id}">${carro.status}</td>`;
  tBody.appendChild(item);

}
let tBody = document.querySelector('.table__tbody');

function loadCarros() {
  let tBody = document.querySelector('.table__tbody');
  tBody.innerHTML = "";
  fetch('http://127.0.0.1:5000/carros', {
    method: "GET"
  })
    .then((response) => response.json())
    .then((data) => {
      data.carros.forEach(carro => {
        let item = document.createElement('tr');
        item.innerHTML = ''
        /* `<th>${carro.id}</th>
                   <td>${carro.modelo}</td>
                   <td>${carro.marca}</td>
                   <td>${carro.ano}</td>
                   <td>${carro.observacoes}</td>
                   <td>${carro.vDiaria}</td>
                   <td>${carro.status}</td>
                   `;
         */
        tBody.appendChild(item);
        addCarro(carro);
      });
    });
}

function loadCarro() {
  let id = document.querySelector('#input_get_id');
  fetch(`http://127.0.0.1:5000/carros/${id.value}`, {
    method: "GET"
  })
    .then((response) => response.json())
    .then((data) => {
      tBody.innerHTML = "";
      addCarro(data.carro);

    }).catch((error) => {
      window.alert("ID não localizado!");
    })
}

/*
function loadCarro() {
  let id = document.querySelector('#input_get_id');
  let tBody = document.querySelector('.table__tbody');
  tBody.innerHTML = "";
  fetch(`http://127.0.0.1:5000/carros/${id.value}`, {
    method: "GET"
  })
    .then((response) => response.json())
    .then((data) => {
      let item = document.createElement('tr');
      item.innerHTML =
        `<th>${data.carros.id}</th>
              <td>${data.carros.modelo}</td>
              <td>${data.carros.marca}</td>`;

    });
}
*/

function deleteCarro(id = 0) {
  if (id == 0) {
    id = document.querySelector('#input_delete_id').value;
  }
  let tBody = document.querySelector('.table__tbody');
  tBody.innerHTML = "";
  fetch(`http://127.0.0.1:5000/carros/${id}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      loadCarros();
    });
}