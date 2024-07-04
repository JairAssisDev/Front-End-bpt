ip = "192.168.0.104"

async function uploadFile() {
  document.getElementById("loadresponse").innerHTML = '<svg viewBox="0 0 100 100"> <path d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92" /> </svg>';
  const file = document.getElementById('fileupload').files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
      const response = await fetch(`http://${ip}:5000/paciente/upload`, {
          method: 'POST',
          body: formData
      });

      if (!response.ok) {
          throw new Error(`Erro ao enviar o arquivo: ${response.statusText}`);
      }

      const result = await response.json();

      document.getElementById("loadresponse").innerHTML = '';

      if (response.status === 200) {
          document.getElementById('response').innerText = result.message;
          if (result.naosalvos && result.naosalvos.length > 0) {
              const patientData = result.naosalvos.map(patient => JSON.stringify(patient)).join('\n');
              document.getElementById('responsenaosalvos').innerText = patientData;
          } else {
              document.getElementById('responsenaosalvos').innerText = 'Nenhum paciente não salvo encontrado.';
          }
      } else if (response.status === 207) {
          document.getElementById('response').innerText = result.message;
          const patientData = result.naosalvos.map(patient => JSON.stringify(patient)).join('\n');
          document.getElementById('responsenaosalvos').innerText = patientData;
      } else {
          throw new Error(`Erro desconhecido: ${result.message}`);
      }
  } catch (error) {
      console.error('Erro na requisição:', error);
      document.getElementById('response').innerText = `Erro na requisição: ${error.message}`;
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