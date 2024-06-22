ip="localhost"

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const data = Object.fromEntries(formData.entries());

  console.log(data);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

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
      elemento.innerHTML ='<div> <center> <h2>Cadastro Paciente</h2> </center> <br> <div id="cadastro_simpes"> <form action="" id="cadastro" style="display:flex; justify-content: center; align-items: center;"> <div> <label for="nome"> Nome: </label> <input type="text" name="nome" id="nome" value="" placeholder="" required> </div> <div> <label for="cpf"> cpf: </label> <input type="cpf" name="cpf" id="cpf" value="" placeholder="" required> </div> <div><label for="sex"> Sexo: </label> <input type="sex" name="sex" id="sex" value="" placeholder="" required> </div> <div> <label for="redo"> Redo: </label> <input type="redo" name="redo" id="redo" value="" placeholder="" required> </div> <div> <label for="cpb"> CPB: </label> <input type="cpb" name="cpb" id="cpb" value="" placeholder="" required> </div> <div> <label for="age"> idade: </label> <input type="age" name="age" id="age" value="" placeholder="" required> </div> <div><label for="bsa"> BSA: </label> <input type="bsa" name="bsa" id="bsa" value="" placeholder="" required> </div> <div> <label for="hb"> HB: </label> <input type="hb" name="hb" id="hb" value="" placeholder="" required> </div> <div><button type="submit">Cadastrar</button></div> <div id="response"></div> </form> <div> <center> <h2>Upload de Arquivo CSV</h2> <br> </center> <div> <form action="http://localhost:5000/paciente/uploadcsv" method="post" enctype="multipart/form-data" style="display:flex; justify-content: center; align-items: center;"> <div> <label for="file">Baixe o modelo de como os dados devem ser submetidos em um arquivo CSV:</label><br></div> <a href="../modelo/pacientes.csv" target="iframe_download">Clique para baixar</a> <div> <label for="file">Selecione um arquivo CSV:</label><br></div> <div><input type="file" id="file" name="file" accept=".csv"><br><br></div> <div><button type="submit" value="Enviar Arquivo">Cadastrar csv</button></div> </form> </div> </div> </div> </div> </div>';
            break;    
    case 2:
       elemento.innerHTML ='<h1>jair</h1>';
       break;
    case 3:
       elemento.innerHTML ='<h1>victor</h1>'
       break;
    case 4:
       elemento.innerHTML ='<h1>lima</h1>'
       break;
    case 5:
       elemento.innerHTML ='<h1>Assis</h1>'
       break;
  }
}

function getToken() {
  var token = localStorage.getItem('token');
  if (token == null) {
      window.location.href = '../pages/login.html';
  }
  select_bloco(1)
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

document.getElementById('cadastro').addEventListener('submit', handleFormSubmit);

