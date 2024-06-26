function cadastrafile() {
    if (typeof localStorage !== "undefined") {
      window.location.href = "../pages/cadastrafile.html";
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

  function signIn() {
    if (typeof localStorage !== "undefined") {
      window.location.href = "../pages/login.html";
    } else {
      console.error("Local storage não está disponível.");
    }
  }

  function signUp() {
    if (typeof localStorage !== "undefined") {
        window.location.href = "../pages/cadastro.html";
    } else {
        console.error("Local storage não está disponível.");
    }
  }