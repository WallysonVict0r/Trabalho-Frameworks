document.addEventListener('DOMContentLoaded', function() {
    const listaTarefas = document.getElementById('lista-tarefas');

    function carregarTarefas() {
        fetch('http://localhost:8080/tarefa/all') // Verifique se este endpoint está correto
            .then(response => response.json())
            .then(data => {
                listaTarefas.innerHTML = ''; // Limpar lista antes de adicionar novos itens

                // Adicionando todas as tarefas
                for (const tarefa of data) {
                    const li = document.createElement('li');
                    li.classList.add('collection-item');

                    // Definindo a cor com base no status da tarefa
                    li.style.color = tarefa.concluida ? 'blue' : 'red';
                    li.textContent = tarefa.descricao;

                    // Adicionando a porcentagem de conclusão
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
    carregarTarefas();

    // Adicionar nova tarefa ao clicar no botão "Salvar"
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
            carregarTarefas(); // Recarregar tarefas
            $('#modal-add-tarefa').modal('close'); // Fechar o modal
        })
        .catch(error => console.error('Erro ao adicionar tarefa:', error));
    });
});
