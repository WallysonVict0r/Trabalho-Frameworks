document.addEventListener('DOMContentLoaded', function() {
  const listaTarefasInicio = document.getElementById('lista-tarefas-inicio'); // Assumindo que você tenha esse elemento

  function carregarTarefasInicio() {
      fetch('http://localhost:8080/tarefa/all') // Endpoint que retorna todas as tarefas
          .then(response => response.json())
          .then(data => {
              listaTarefasInicio.innerHTML = ''; // Limpar lista antes de adicionar novos itens

              // Adicionando todas as tarefas
              for (const tarefa of data) {
                  const li = document.createElement('li');
                  li.classList.add('collection-item');

                  // Definindo a cor com base no status da tarefa
                  li.style.color = tarefa.concluida ? 'blue' : 'red';
                  li.textContent = tarefa.descricao;

                  // Se desejar, adicione a porcentagem de conclusão
                  const porcentagem = calcularPorcentagem(tarefa.data_inicio, tarefa.data_limite);
                  li.textContent += ` - Conclusão: ${porcentagem}%`;

                  listaTarefasInicio.appendChild(li);
              }
          })
          .catch(error => console.error('Erro ao carregar tarefas:', error));
  }

  function calcularPorcentagem(dataInicio, dataLimite) {
      const hoje = new Date();
      const inicio = new Date(dataInicio);
      const limite = new Date(dataLimite);

      // Verificando se as datas são válidas
      if (isNaN(inicio) || isNaN(limite)) {
          console.error('Data de início ou limite inválida');
          return 0; // Retorna 0% se houver um erro nas datas
      }

      const totalDias = Math.abs(limite - inicio) / (1000 * 60 * 60 * 24);
      const diasPassados = Math.abs(hoje - inicio) / (1000 * 60 * 60 * 24);

      // Verificando se totalDias é maior que zero para evitar divisão por zero
      if (totalDias <= 0) {
          return 100; // Se a data de limite já passou ou é a mesma que a de início, consideramos 100%
      }

      const porcentagem = (diasPassados / totalDias) * 100;
      return Math.min(Math.max(porcentagem, 0), 100).toFixed(2); // Retorna entre 0 e 100
  }

  // Carregar tarefas ao iniciar
  carregarTarefasInicio();
});