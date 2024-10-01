document.addEventListener('DOMContentLoaded', function() {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  function carregarHabitos() {
    fetch('http://localhost:8080/habitos/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta da rede');
        }
        return response.json();
      })
      .then(data => {
        const listaHabitos = document.getElementById('lista-habitos');
const historicoHabitos = document.getElementById('historico-habitos');

    if (listaHabitos && historicoHabitos) {
      listaHabitos.innerHTML = '';
      historicoHabitos.innerHTML = '';

        // Usando for...of para iterar sobre os hábitos
        for (const habito of data.habitos) {
          const li = document.createElement('li');
          li.classList.add('collection-item');
          li.textContent = habito.descricao;
          listaHabitos.appendChild(li);
        }

        // Usando for...of para iterar sobre o histórico
        for (const historico of data.historico) {
          const li = document.createElement('li');
          li.classList.add('collection-item');
          li.textContent = `Hábito: ${historico.habito.descricao} - Data: ${historico.data}`;
          historicoHabitos.appendChild(li);
        }
      }
      })
      .catch(error => console.error('Erro ao carregar hábitos:', error));
  }
  

  function adicionarHabito() {
    document.getElementById('form-habito').addEventListener('submit', function(event) {
      event.preventDefault();
      const descricaoHabito = document.getElementById('descricao_habito').value;

      fetch('http://localhost:8080/habito-historico/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descricao: descricaoHabito })
      })
      .then(response => response.json())
      .then(data => {
        M.toast({html: 'Hábito adicionado com sucesso!'});
        carregarHabitos();
      })
      .catch(error => console.error('Erro ao adicionar hábito:', error));
    });
  }

  function carregarHistoricoHabitos() {
    fetch('http://localhost:8080/habito-historico/all')  // Adicione o endpoint correto aqui
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta da rede');
        }
        return response.json();
      })
      .then(data => {
        const historicoList = document.getElementById('historico-habitos-list');
        historicoList.innerHTML = '';

        // Usando for...of para iterar sobre o histórico
        for (const historico of data) {
          const li = document.createElement('li');
          li.className = 'collection-item';
          li.textContent = `${historico.data} - ${historico.habito.descricao}`;
          historicoList.appendChild(li);
        }
      })
      .catch(error => console.error('Erro ao carregar histórico de hábitos:', error));
  }

  carregarHabitos();
  carregarHistoricoHabitos();
  adicionarHabito();
});