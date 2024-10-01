document.addEventListener('DOMContentLoaded', function() {
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
                    const listaPendentes = document.getElementById('lista-tarefas-pendentes');
                    listaPendentes.innerHTML = '';
                    tarefas.map(tarefa => {
                        const li = document.createElement('li');
                        li.classList.add('list-group-item');
                        li.textContent = tarefa.descricao;
                        listaPendentes.appendChild(li);
                    });
                } else {
                    console.error('Tarefas não são um array');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }

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
                    alert('Tarefa adicionada com sucesso!');
                    carregarTarefas(); 
                    $('#modal-add-tarefa').modal('hide'); 
                })
                .catch(error => console.error('Erro ao adicionar tarefa:', error));
        } else {
            alert('Preencha a descrição da tarefa!');
        }
    });

    carregarTarefas();
});