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

document.getElementById('cadastro').addEventListener('submit', handleFormSubmit);