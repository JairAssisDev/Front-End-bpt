ip = "localhost"

async function uploadcsv() {
  document.getElementById("loadresponsecsv").innerHTML = '<svg viewBox="0 0 100 100"> <path d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92" /> </svg>';
  const file = document.getElementById('fileCSV').files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:5000/paciente/uploadcsv', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar o arquivo: ${response.statusText}`);
    }

    const result = await response.json();

    document.getElementById("loadresponsecsv").innerHTML = '';

    if (response.status === 200) {
    
      document.getElementById('responsecsv').innerText = result.message;
      
    } else if (response.status === 207) {
        alert("oi",response.status)
        document.getElementById('responsecsv').innerText = result.message;
        const patientData = result.naosalvos.map(patient => JSON.stringify(patient)).join('\n');
        document.getElementById('responsecsvnaosalvos').innerText = patientData;
      

    } else {
      throw new Error(`Erro desconhecido: ${result.message}`);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    const responseElement = document.getElementById('responsecsv');
    if (responseElement) {
      responseElement.innerText = `Erro na requisição: ${error.message}`;
    } else {
      console.error("Elemento 'responsecsv' não encontrado no DOM");
    }
  }
}




async function uploadxlsx() {
  document.getElementById("loadresponsexlsx").innerHTML = '<svg viewBox="0 0 100 100"> <path d="M 50 96 a 46 46 0 0 1 0 -92 46 46 0 0 1 0 92" /> </svg>';
  const file = document.getElementById('filexlsx').files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:5000/paciente/uploadxlsx', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar o arquivo: ${response.statusText}`);
    }

    const result = await response.json();

    document.getElementById("loadresponsexlsx").innerHTML = '';

    if (response.status === 200) {
      document.getElementById('responsexlsx').innerText = result.message;
      if (result.naosalvos && result.naosalvos.length > 0) {
        const patientData = result.naosalvos.map(patient => JSON.stringify(patient)).join('\n');
        document.getElementById('responsexlsxnaosalvos').innerText = patientData;
      } else {
        document.getElementById('responsexlsxnaosalvos').innerText = 'Nenhum paciente não salvo encontrado.';
      }
    } else if (response.status === 207) {
      document.getElementById('responsexlsx').innerText = result.message;
      const patientData = result.naosalvos.map(patient => JSON.stringify(patient)).join('\n');
      document.getElementById('responsexlsxnaosalvos').innerText = patientData;
    } else {
      throw new Error(`Erro desconhecido: ${result.message}`);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    document.getElementById('responsexlsx').innerText = `Erro na requisição: ${error.message}`;
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