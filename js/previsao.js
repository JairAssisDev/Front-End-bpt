ip="192.168.0.107"

async function atualizar() {

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
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  console.log(data);

  const url = `http://${ip}:5000/paciente/${encodeURIComponent(nome)}/${encodeURIComponent(cpf)}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
       
        const errorData = await response.json();
        console.error('Erro de validação:', errorData);
        document.getElementById("response").innerText = "Erro ao atualizar paciente "
        throw new Error('Erro na requisição: ' + response.statusText);
      }
      
      const responseData = await response.json();
      console.log( responseData.data.prediction)
      console.log(responseData.data)
      document.getElementById("response_previsao").innerText="A probabilidade do paciente precisar de transfusão é "+responseData.data.true_probability;
      const img= 'data:image/jpeg;base64,' + responseData.data.lime_image;
      document.getElementById("lime_image").innerHTML = '<img id="prediction_image" src='+img+' alt="Prediction Image">'
      console.log('Resposta:', responseData.data.lime_image);
      document.getElementById("response").innerText = "Paciente atualizado com sucesso";

    } catch (error) {
      console.error('Erro:', error);
    }
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

  console.log(data);
  const url = 'http://'+ip+':5000/paciente';

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro de validação:', errorData);
        document.getElementById("response").innerText = "Erro ao cadastrar paciente "
        throw new Error('Erro na requisição: ' + response.statusText);
      }

      const responseData = await response.json();
      console.log('Resposta:', responseData);
      document.getElementById("response").innerText = "Paciente cadastrado com sucesso";

    } catch (error) {
      console.error('Erro:', error);
    }
}

function select_bloco(tipo){
  const elemento = document.getElementById("bloco_dinamico");
  switch(tipo){
    case 1:
      window.location.href = "../pages/previsao.html";
      break;    
    case 2:
       window.location.href = "../pages/atualizar.html";
       break;
  }
}

function getToken() {
  var token = localStorage.getItem('token');
  if (token == null) {
      window.location.href = '../pages/login.html';
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

