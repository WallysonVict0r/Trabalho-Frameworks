document.addEventListener('DOMContentLoaded', function() {
    const listaTarefas = document.getElementById('lista-tarefas');

    function carregarTarefas() {
        fetch('http://localhost:8080/tarefa/all') 
            .then(response => response.json())
            .then(data => {
                listaTarefas.innerHTML = ''; 

               
                for (const tarefa of data) {
                    const li = document.createElement('li');
                    li.classList.add('collection-item');

                    
                    li.style.color = tarefa.concluida ? 'blue' : 'red';
                    li.textContent = tarefa.descricao;

                   
                    const porcentagem = calcularPorcentagem(tarefa.data_inicio, tarefa.data_limite);
                    li.textContent += ` - Conclusão: ${porcentagem}%`;

                    listaTarefas.appendChild(li);
                }
            })
            .catch(error => console.error('Erro ao carregar tarefas:', error));
    }

    function calcularPorcentagem(dataInicio, dataLimite) {
        const hoje = new Date();
        const inicio = new Date(dataInicio);
        const limite = new Date(dataLimite);
    
       
        if (isNaN(inicio) || isNaN(limite)) {
            console.error('Data de início ou limite inválida');
            return 0;
        }
    
        const totalDias = Math.abs(limite - inicio) / (1000 * 60 * 60 * 24);
        const diasPassados = Math.abs(hoje - inicio) / (1000 * 60 * 60 * 24);
    
        
        if (totalDias <= 0) {
            return 100; 
        }
    
        const porcentagem = (diasPassados / totalDias) * 100;
        return Math.min(Math.max(porcentagem, 0), 100).toFixed(2); 
    }

    carregarTarefas();


    document.getElementById('salvar-tarefa-btn').addEventListener('click', function() {
        const descricaoTarefa = document.getElementById('descricao-tarefa').value;

        fetch('http://localhost:8080/tarefa/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descricao: descricaoTarefa, id_usuario: 1 })
        })
        .then(response => response.json())
        .then(data => {
            M.toast({html: 'Tarefa adicionada com sucesso!'});
            carregarTarefas(); 
            $('#modal-add-tarefa').modal('close');
        })
        .catch(error => console.error('Erro ao adicionar tarefa:', error));
    });
});
