document.addEventListener('DOMContentLoaded', function() {
    const listaPendentes = document.getElementById('lista-tarefas-pendentes');
    const listaConcluidas = document.getElementById('lista-tarefas-concluidas');
  
    function carregarTarefasPendentes() {
        fetch('http://localhost:8080/tarefa/pendentes')
          .then(response => response.json())
          .then(data => {
            listaPendentes.innerHTML = ''; // Limpar lista antes de adicionar novos itens
    
            // Adicionando as tarefas pendentes
            for (const tarefa of data) {
              const li = document.createElement('li');
              li.classList.add('collection-item');
              li.textContent = tarefa.descricao;
              listaPendentes.appendChild(li);
            }
          })
          .catch(error => console.error('Erro ao carregar tarefas pendentes:', error));
      }
    
      function carregarTarefasConcluidas() {
        fetch('http://localhost:8080/tarefa/concluidas')
          .then(response => response.json())
          .then(data => {
            listaConcluidas.innerHTML = ''; // Limpar lista antes de adicionar novos itens
    
            // Adicionando as tarefas concluídas
            for (const tarefa of data) {
              const li = document.createElement('li');
              li.classList.add('collection-item');
              li.textContent = tarefa.descricao;
              listaConcluidas.appendChild(li);
            }
          })
          .catch(error => console.error('Erro ao carregar tarefas concluídas:', error));
      }
    
      // Carregar tarefas ao iniciar
      carregarTarefasPendentes();
      carregarTarefasConcluidas();
    });