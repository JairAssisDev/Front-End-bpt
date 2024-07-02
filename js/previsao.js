const ip = 'localhost';

var pacientes = [];

async function listar_pacientes() {
  try {
    const response = await fetch(`http://${ip}:5000/paciente/getallpacientes`);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    listar(data)

  } catch (error) {
    console.error('Error fetching patients:', error);
  }
}
async function listar_pacinete_prob() {
  try {
    const response = await fetch(`http://${ip}:5000/paciente/getproballpacientes`);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    listar(data)

  } catch (error) {
    console.error('Error fetching patients:', error);
  }
}


function listar(data) {

  const tbody = document.querySelector('.divTable tbody');
  tbody.innerHTML = '';
  pacientes = data[0].pacientes;
  pacientes.forEach((paciente, index) => {
    const tableRow = document.createElement('tr');

    const nomeCell = document.createElement('td');
    nomeCell.textContent = paciente.nome;
    tableRow.appendChild(nomeCell);

    const cpfCell = document.createElement('td');
    cpfCell.textContent = paciente.cpf;
    tableRow.appendChild(cpfCell);

    const sexCell = document.createElement('td');
    sexCell.textContent = paciente.sex;
    tableRow.appendChild(sexCell);

    const redoCell = document.createElement('td');
    redoCell.textContent = paciente.redo;
    tableRow.appendChild(redoCell);

    const cpbCell = document.createElement('td');
    cpbCell.textContent = paciente.cpb;
    tableRow.appendChild(cpbCell);

    const ageCell = document.createElement('td');
    ageCell.textContent = paciente.age;
    tableRow.appendChild(ageCell);

    const bsaCell = document.createElement('td');
    bsaCell.textContent = paciente.bsa;
    tableRow.appendChild(bsaCell);

    const hbCell = document.createElement('td');
    hbCell.textContent = paciente.hb;
    tableRow.appendChild(hbCell);

    const probCell = document.createElement('td');
    probCell.textContent = paciente.probability.toFixed(3);
    tableRow.appendChild(probCell);

    const editarCell = document.createElement('td');
    editarCell.innerHTML = `<center><button onclick="editar_paciente(${index})"><i class='bx bx-edit'></i></button></center>`;
    tableRow.appendChild(editarCell);

    const excluirCell = document.createElement('td');
    excluirCell.innerHTML = `<center><button onclick="excluir_paciente(${index})"><i class='bx bx-trash'></i></button></center>`;
    tableRow.appendChild(excluirCell);

    const maisCell = document.createElement('td');
    maisCell.innerHTML = `<center><button onclick="mostramaisItem(${index})"><i class='bx bx-image-alt'></i></button></center>`;
    tableRow.appendChild(maisCell);


    tbody.appendChild(tableRow);
  });

  console.log(pacientes);

}



function editar_paciente(id) {
  const paciente = pacientes[id];
  if (paciente) {
    console.log(`Edit patient with id: ${id}`, paciente);
    nome = document.getElementById('a-nome').value = paciente.nome;
    cpf = document.getElementById('a-cpf').value = paciente.cpf;
    sex = document.getElementById('a-sex').value = paciente.sex;
    redo = document.getElementById('a-redo').value = paciente.redo;
    cpb = document.getElementById('a-cpb').value = paciente.cpb;
    age = document.getElementById('a-age').value = paciente.age;
    bsa = document.getElementById('a-bsa').value = paciente.bsa;
    hb = document.getElementById('a-hb').value = paciente.hb;
    document.getElementById('a-response').innerText = '';
    openModal2();

  }

}

async function btnAtualizar() {
  var nome = document.getElementById("a-nome").value;
  var cpf = document.getElementById("a-cpf").value;
  var sex = parseInt(document.getElementById("a-sex").value);
  var redo = parseInt(document.getElementById("a-redo").value);
  var cpb = parseInt(document.getElementById("a-cpb").value);
  var age = parseFloat(document.getElementById("a-age").value);
  var bsa = parseFloat(document.getElementById("a-bsa").value);
  var hb = parseFloat(document.getElementById("a-hb").value);
  var data = {
    "nome": nome,
    "cpf": cpf,
    "sex": sex,
    "redo": redo,
    "cpb": cpb,
    "age": age,
    "bsa": bsa,
    "hb": hb
  };
  console.log(data)
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  console.log(data);
  const url = 'http://' + ip + ':5000/paciente/' + nome + "/" + cpf;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro de validação:', errorData);
      document.getElementById("a-response").innerText = "Erro ao Atualizar paciente "
      throw new Error('Erro na requisição: ' + response.statusText);
    }

    const responseData = await response.json();
    console.log('Resposta:', responseData);
    document.getElementById("a-response").innerText = responseData.message;
    listar_pacientes();
  } catch (error) {
    console.error('Erro:', error);
  }
}


async function excluir_paciente(id) {
  const paciente = pacientes[id];
  if (paciente) {
    try {
      const response = await fetch(`http://${ip}:5000/paciente/${paciente.nome}/${paciente.cpf}`, { method: 'DELETE' });
      if (response.ok) {
        console.log('Paciente excluído com sucesso');
        listar_pacientes();
      } else {
        throw new Error('Erro ao excluir paciente');
      }
    } catch (error) {
      console.error('Erro ao excluir paciente:', error);
    }
  }
}

const modal = document.querySelector('.modal-container');
const modal2 = document.querySelector('.modal-container2');
const model3 = document.querySelector('.modal-container3');

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      document.getElementById("nome").value = '';
      document.getElementById("cpf").value = '';
      document.getElementById("sex").value = '';
      document.getElementById("redo").value = '';
      document.getElementById("cpb").value = '';
      document.getElementById("age").value = '';
      document.getElementById("bsa").value = '';
      document.getElementById("hb").value = '';
      modal.classList.remove('active');
    }
  };
}
function openModal2(edit = false, index = 0) {
  modal2.classList.add('active');

  modal2.onclick = e => {
    if (e.target.className.indexOf('modal-container2') !== -1) {
      modal2.classList.remove('active');
    }
  };
}

async function cadastrar() {
  var nome = document.getElementById("nome").value;
  var cpf = document.getElementById("cpf").value;
  var sex = parseInt(document.getElementById("sex").value);
  var redo = parseInt(document.getElementById("redo").value);
  var cpb = parseInt(document.getElementById("cpb").value);
  var age = parseFloat(document.getElementById("age").value);
  var bsa = parseFloat(document.getElementById("bsa").value);
  var hb = parseFloat(document.getElementById("hb").value);
  var data = {
    "nome": nome,
    "cpf": cpf,
    "sex": sex,
    "redo": redo,
    "cpb": cpb,
    "age": age,
    "bsa": bsa,
    "hb": hb
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  const url = `http://${ip}:5000/paciente`;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro de validação:', errorData);
      document.getElementById("response").innerText = "Erro ao cadastrar paciente ";
      throw new Error('Erro na requisição: ' + response.statusText);
    }

    const responseData = await response.json();
    console.log('Resposta:', responseData);
    document.getElementById("response").innerText = "Paciente cadastrado com sucesso";
    listar_pacientes();

  } catch (error) {
    console.error('Erro:', error);
    document.getElementById("response").innerText = "Erro ao cadastrar paciente";
  }
}

document.getElementById("btnSalvar").addEventListener("click", cadastrar);
document.getElementById("btnAtualizar").addEventListener("click", btnAtualizar)


function getToken() {
  var token = localStorage.getItem('token');
  if (token == null) {
    window.location.href = '../pages/login.html';
  } else {
    listar_pacientes();


  }
}
getToken();

function singOut() {
  if (typeof localStorage !== "undefined") {
    localStorage.clear();
    alert("Você foi desconectado com sucesso.");
    window.location.href = "../pages/login.html";
  } else {
    console.error("Local storage não está disponível.");
  }
}
function cadastrafile() {
  if (typeof localStorage !== "undefined") {
    window.location.href = "../pages/cadastrafile.html";
  } else {
    console.error("Local storage não está disponível.");
  }
}

async function mostramaisItem(id) {
  const paciente = pacientes[id];
  console.log(paciente)
  try {
    const response = await fetch(`http://${ip}:5000/paciente//img/${paciente.nome}/${paciente.cpf}`);
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.message[0].imagem)
    document.getElementById('i-nomePaciente').innerText = 'gráfico da previsão do paciente:'+data.message[0].nome;
    document.getElementById('i-response').innerHTML = '<div id="lime_image"> <img id="prediction_image" src="" alt="Prediction Image"> </div>';
    var predictionImageElement = document.getElementById("prediction_image");
    predictionImageElement.src = 'data:image/jpeg;base64,' + data.message[0].imagem;
    openModal3()
  } catch (error) {
    console.error('Error fetching patients:', error);
  }

}

function openModal3(edit = false, index = 0) {
  model3.classList.add('active');

  model3.onclick = e => {
    if (e.target.className.indexOf('modal-container3') !== -1) {
      model3.classList.remove('active');
    }
  };
}