function adicionarHabito() {
  document.getElementById('form-habito').addEventListener('submit', function(event) {
    event.preventDefault();
    const descricaoHabito = document.getElementById('descricao_habito').value;

    // Obtendo o token armazenado
    const token = localStorage.getItem('token'); // Ajuste se o token estiver em um local diferente

    fetch('http://localhost:8080/habitos/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Incluindo o token no cabeçalho
      },
      body: JSON.stringify({ descricao: descricaoHabito })
    })
    .then(response => response.json())
    .then(data => {
      M.toast({ html: 'Hábito adicionado com sucesso!' });
      carregarHabitos();
    })
    .catch(error => console.error('Erro ao adicionar hábito:', error));
  });
}