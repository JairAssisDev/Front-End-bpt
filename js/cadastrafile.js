ip = "localhost"
async function uploadcsv() {
  const file = document.getElementById('fileCSV').files[0];;
  const formData = new FormData();
  formData.append('file', file)

  const response = await fetch('http://localhost:5000/paciente/uploadcsv',
    {
      method: 'POST',
      body: formData
    });
  const status = await response.status; 
  const result = await response.json();

  const resultadoElement = document.getElementById('responsecsv');
  if (resultadoElement) { 
    if (status === 200) {
      resultadoElement.textContent = 'Arquivo enviado com sucesso!';
    } else {
      resultadoElement.textContent = `Erro ao enviar o arquivo: ${result.mensage}`;
    }
  } else {
    console.error("Elemento 'resultado' não encontrado no DOM");
  }
}

async function uploadxlsx() {
  const file = document.getElementById('filexlsx').files[0];;
  const formData = new FormData();
  formData.append('file', file)

  const response = await fetch('http://localhost:5000/paciente/uploadxlsx',
    {
      method: 'POST',
      body: formData
    });
  const status = await response[1]; 
  const result = await response.json();

  const resultadoElement = document.getElementById('responsexlsx');
  if (resultadoElement) { 
    if (status == 200) {
      console.log(response[1])
      console.log(response[0])
      resultadoElement.textContent = result.naosalvos;

    }else if(status == 207){
      console.log(response[1])
      console.log(response[0])
      resultadoElement.textContent = response.naosalvos;
    }
     else {
      console.log(result)
      console.log(status)
      resultadoElement.textContent = `Erro ao enviar o arquivo: ${result.mensage}`;
    }
  } else {
    console.error("Elemento 'resultado' não encontrado no DOM");
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



function previsao() {
  if (typeof localStorage !== "undefined") {
    window.location.href = "../pages/previsao.html";
  } else {
    console.error("Local storage não está disponível.");
  }
}