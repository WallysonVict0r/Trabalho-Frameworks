document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar todas as tarefas
    function carregarTarefas() {
      fetch('http://localhost:8080/tarefa/all')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Erro na resposta da rede');
              }
              return response.json();
          })
          .then(data => {
              const listaTarefas = document.getElementById('lista-tarefas');
              listaTarefas.innerHTML = ''; // Limpar lista
  
              // Verifica se data é um array
              if (Array.isArray(data)) {
                  // Iterar pelas tarefas
                  for (const tarefa of data) {
                      const li = document.createElement('li');
                      li.classList.add('collection-item');
                      li.textContent = `${tarefa.descricao} - ${tarefa.concluida ? 'Concluída' : 'Pendente'}`;
                      listaTarefas.appendChild(li);
                  }
              } else {
                  console.error('Dados retornados não são um array');
              }
          })
          .catch(error => console.error('Erro ao carregar tarefas:', error));
  }

    // Carrega as tarefas ao iniciar a página
    carregarTarefas();
  });