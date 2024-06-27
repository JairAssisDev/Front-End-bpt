ip = "localhost"
async function uploadcsv() {
  const file = document.getElementById('file').files[0];;
  const formData = new FormData();
  formData.append('file', file)

  const response = await fetch('http://localhost:5000/paciente/uploadcsv',
    {
      method: 'POST',
      body: formData
    });
  const status = await response.status; // Obter o status da resposta
  const result = await response.json(); // Obter o JSON da resposta

  const resultadoElement = document.getElementById('responsecsv');
  if (resultadoElement) {  // Check if element exists
    if (status === 200) {
      resultadoElement.textContent = 'Arquivo enviado com sucesso!';
    } else {
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