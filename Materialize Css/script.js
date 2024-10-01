document.getElementById('login-btn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8080/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login falhou');
        }
        return response.json(); // Modificado para retornar JSON
    })
    .then(data => {
        // Esperando que o retorno seja um objeto com token, createdAt e expiresIn
        const { token, createdAt, expiresIn } = data;

        // Armazenando o token e informações adicionais, se necessário
        localStorage.setItem('token', token); 
        localStorage.setItem('createdAt', createdAt); 
        localStorage.setItem('expiresIn', expiresIn); 

        // Redirecionar após login
        window.location.href = 'http://127.0.0.1:5500/tarefas/tarefas.html'; 
    })
    .catch(error => console.error('Erro ao fazer login:', error));
});