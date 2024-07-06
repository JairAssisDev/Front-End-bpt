ip="192.168.0.107"

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

  const url = `http://${ip}:5000/user/create`;

  var password = document.getElementById("password").value;
  var passwordConfirn = document.getElementById("passwordConfirn").value;
  if (password == passwordConfirn) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro de validação:', errorData);
        document.getElementById("response").innerText = "Erro ao criar usuario "
        throw new Error('Erro na requisição: ' + response.statusText);
      }

      const responseData = await response.json();
      console.log('Resposta:', responseData);
      document.getElementById("response").innerText = "Usuario cadastrado com sucesso";
      window.location.href = '../pages/login.html'

    } catch (error) {
      console.error('Erro:', error);
    }
  }else{
    document.getElementById("response").innerText = "Confirmação incorreta";
  }
}

document.getElementById('cadastro').addEventListener('submit', handleFormSubmit);
