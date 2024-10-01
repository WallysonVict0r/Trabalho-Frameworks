document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tabs');
    M.Tabs.init(elems);
    function carregarTarefas() {
        fetch('http://localhost:8080/tarefa/pendentes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar tarefas');
                }
                return response.json();
            })
            .then(tarefas => {
                if (Array.isArray(tarefas)) {
                    
                    tarefas.map(tarefa => {
                
                        console.log(tarefa);
                    });
                } else {
                    console.error('Tarefas não são um array');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }
    
    // Chame a função para carregar as tarefas
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