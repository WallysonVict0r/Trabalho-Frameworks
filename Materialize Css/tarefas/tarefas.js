document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tabs');
    M.Tabs.init(elems);
    function carregarTarefas() {
      fetch('http://localhost:8080/tarefa/all')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok: ' + response.statusText);
              }
              return response.json();
          })
          .then(data => {
              console.log(data); // Adicione este log para inspecionar os dados retornados
              // Verifique se 'data' é um array
              if (Array.isArray(data)) {
                  data.forEach(tarefa => {
                      console.log(tarefa); // Aqui você pode manipular as tarefas
                  });
              } else {
                  console.error('O retorno não é um array:', data);
              }
          })
          .catch(error => {
              console.error('Erro ao carregar tarefas:', error);
          });
  }

    
    carregarTarefas();
  document.getElementById('salvar-tarefa-btn').addEventListener('click', function () {
    const descricao = document.getElementById('descricao-tarefa').value;

    if (descricao) {
        fetch('http://localhost:8080/tarefas/add', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descricao: descricao,
                concluida: false,
                dataInicio: new Date(),
                dataLimite: null 
            })
        })
            .then(response => response.json())
            .then(() => {
                M.toast({html: 'Tarefa adicionada com sucesso!'});
                carregarTarefas(); 
                M.Modal.getInstance(document.getElementById('modal-add-tarefa')).close(); // Fecha o modal
            })
            .catch(error => console.error('Erro ao adicionar tarefa:', error));
    } else {
        M.toast({html: 'Preencha a descrição da tarefa!'});
    }
    });
  
});