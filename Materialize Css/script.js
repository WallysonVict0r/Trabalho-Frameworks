document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar todas as tarefas
    function carregarTarefas() {
      // Requisição para carregar tarefas (substitua o endpoint depois)
      fetch(' http://localhost:8080/tarefas/all')
        .then(response => response.json())
        .then(data => {
          const listaTarefas = document.getElementById('lista-tarefas');
          listaTarefas.innerHTML = ''; // Limpar lista

          // Iterar pelas tarefas e adicionar à lista
          data.tarefas.forEach(tarefa => {
            const li = document.createElement('li');
            li.classList.add('collection-item');
            li.textContent = `${tarefa.descricao} - ${tarefa.concluida ? 'Concluída' : 'Pendente'}`;
            listaTarefas.appendChild(li);
          });
        })
        .catch(error => console.error('Erro ao carregar tarefas:', error));
    }

    // Carrega as tarefas ao iniciar a página
    carregarTarefas();
  });