ip = "localhost"
async function uploadFile(url, file, type) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Assuming server responds with JSON
    displayResponse(data, type); // Call function to display success/error message
  } catch (error) {
    console.error("Error uploading file:", error);
    displayResponse({ message: "Error uploading file." }, type); // Display error message
  }
}

function displayResponse(data, type) {
  const responseElement = document.getElementById(`response${type}`);
  responseElement.textContent = data.message || "Upload successful!"; // Handle different message formats
}

// Example usage:
const fileInputXlsx = document.getElementById("file");
fileInputXlsx.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
    alert("Please select an XLSX file.");
    return;
  }
  uploadFile("http://localhost:5000/paciente/uploadxlsx", file, "xlsx");
});

const fileInputCsv = document.getElementById("file"); // Assuming same ID for both CSV and XLSX inputs
fileInputCsv.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file.type !== "text/csv") {
    alert("Please select a CSV file.");
    return;
  }
  uploadFile("http://localhost:5000/paciente/uploadcsv", file, "csv");
});


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