const ip = 'localhost';

  async function listar_pacientes() {
    try {
      const response = await fetch('http://localhost:5000/paciente/getallpacientes');
  
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
  
      const tbody = document.querySelector('.divTable tbody'); 
      var tesr=0
      data[0].pacientes.forEach(paciente => {
        console.log(tesr);
        tesr=tesr+1;
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
        editarCell.innerHTML = `<center><button onclick="editItem(${data.indexOf(paciente)})"><i class='bx bx-edit' ></button></center>`;
        tableRow.appendChild(editarCell);
  
        const excluirCell = document.createElement('td');
        excluirCell.innerHTML = `<center><button onclick="deleteItem(${data.indexOf(paciente)})"><i class='bx bx-trash'></button></center>`; 
        tableRow.appendChild(excluirCell);
        
        const maisCell = document.createElement('td');
        maisCell.innerHTML = `<center><button onclick="deleteItem(${data.indexOf(paciente)})"><i class='bx bx-image-alt' ></button></center>`; 
        tableRow.appendChild(maisCell);
        
  
        tbody.appendChild(tableRow);
      });

  
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }

  
  function editar_paciente(id) {
    console.log(`Edit patient with id: ${id}`);
  }
  
  function excluir_paciente(id) {
    console.log(`Delete patient with id: ${id}`);
  }
  
  const modal = document.querySelector('.modal-container');

  function openModal(edit = false, index = 0) {
    modal.classList.add('active');
  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active');
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
  
    // Construir o objeto de dados
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
  
    const url = 'http://' + ip + ':5000/paciente';
  
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
  
    } catch (error) {
      console.error('Erro:', error);
      document.getElementById("response").innerText = "Erro ao cadastrar paciente";
    }
  }
  
  document.getElementById("btnSalvar").addEventListener("click", cadastrar);
  