document.addEventListener('DOMContentLoaded', function() {
    const listaTarefas = document.getElementById('lista-tarefas');
    
    function carregarTarefas() {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/tarefa/all', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            listaTarefas.innerHTML = '';
            data.forEach(tarefa => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.textContent = tarefa.descricao;

                const porcentagem = calcularPorcentagem(tarefa.dataInicio, tarefa.dataLimite);
                li.textContent += ` - Progresso: ${porcentagem}%`;

                listaTarefas.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao carregar tarefas:', error));
    }

    function calcularPorcentagem(dataInicio, dataLimite) {
        const hoje = new Date();
        const inicio = new Date(dataInicio);
        const limite = new Date(dataLimite);
        const totalDias = Math.abs(limite - inicio) / (1000 * 60 * 60 * 24);
        const diasPassados = Math.abs(hoje - inicio) / (1000 * 60 * 60 * 24);
        return Math.min(Math.max((diasPassados / totalDias) * 100, 0), 100).toFixed(2);
    }

    document.getElementById('salvar-tarefa-btn').addEventListener('click', function () {
        const descricao = document.getElementById('descricao-tarefa').value;
        const dataInicio = document.getElementById('data-inicio').value;
        const horaInicio = document.getElementById('hora-inicio').value;
        const dataLimite = document.getElementById('data-limite').value;
        const horaLimite = document.getElementById('hora-limite').value;
        const concluida = document.getElementById('concluida').checked;

        const token = localStorage.getItem('token');
        const dataHoraInicio = `${dataInicio}T${horaInicio}`;
        const dataHoraLimite = `${dataLimite}T${horaLimite}`;

        fetch('http://localhost:8080/tarefa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                descricao: descricao,
                dataInicio: dataHoraInicio,
                dataLimite: dataHoraLimite,
                isConcluida: concluida
            })
        })
        .then(() => {
            carregarTarefas();
            $('#modal-add-tarefa').modal('hide');
        })
        .catch(error => console.error('Erro ao adicionar tarefa:', error));
    });

    carregarTarefas();
});