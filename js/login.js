ip="192.168.0.104"
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
    
    const url = `http://${ip}:5000/user/auth`;
    

    try {
        try {
            const response = await fetch(url, options);
      
            if (!response.ok) {
              const errorData = await response.json();
              console.error('Erro de validação:', errorData);
              document.getElementById("response").innerText = "Email ou senha está incorreto"
              throw new Error('Erro na requisição: ' + response.statusText);
            }
      
            const responseData = await response.json();
            console.log('Resposta:', responseData);
            console.log('Resposta:', responseData.token);
            localStorage.setItem('token', responseData.token)
            window.location.href = '../pages/previsao.html'
      
        } catch (error) {
            console.error('Erro:', error);
        }
    } catch (error) {
        console.error('Erro:', error);
    }

}

document.getElementById('login').addEventListener('submit', handleFormSubmit);