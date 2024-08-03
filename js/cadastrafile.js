const ip = '35.199.124.249';

async function uploadFile() {
  document.getElementById("loadresponse").innerHTML = '<svg viewBox="0 0 100 100"> <path d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92" /> </svg>';
  const file = document.getElementById('fileupload').files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
      console.log('Enviando arquivo:', file);  // Log do arquivo a ser enviado
      const response = await fetch(`http://${ip}:5000/paciente/upload`, {
          method: 'POST',
          body: formData
      });

      console.log(response);

      if (!response.ok) {
          const errorText = await response.text(); // Adicionando esta linha para capturar o texto do erro
          throw new Error(`Erro ao enviar o arquivo: ${response.statusText} - ${errorText}`);
      }

      if (response.status === 200) {
          const result = await response.json();
          document.getElementById("loadresponse").innerHTML = '';
          document.getElementById('response').innerText = result.message;
          if (result.naosalvos && result.naosalvos.length > 0) {
              const patientData = result.naosalvos.map(patient => JSON.stringify(patient)).join('\n');
              document.getElementById('responsenaosalvos').innerText = patientData;
          } else {
              document.getElementById('responsenaosalvos').innerText = 'Nenhum paciente não salvo encontrado.';
          }
      } else if (response.status === 207) {
          document.getElementById('response').innerText = 'Parte ou todos os pacientes não foram salvos porque já constam na base de dados. Verifique o arquivo que será baixado.';
          const blob = await response.blob();
          const downloadUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = 'pacientes.xlsx';
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(downloadUrl);
          document.getElementById("loadresponse").innerHTML = '';
      } else {
          throw new Error(`Erro desconhecido: ${response.statusText}`);
      }
  } catch (error) {
      console.error('Erro na requisição:', error);
      document.getElementById("loadresponse").innerHTML = '';
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
