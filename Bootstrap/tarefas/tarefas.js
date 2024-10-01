document.addEventListener('DOMContentLoaded', function() {
    const listaTarefas = document.getElementById('lista-tarefas');

    function carregarTarefas() {
        // Obtendo o token armazenado
        const token = localStorage.getItem('token'); // Ajuste se o token estiver em um local diferente

        fetch('http://localhost:8080/tarefa/all', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Incluindo o token no cabeçalho
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da rede');
            }
            return response.json();
        })
        .then(data => {
            listaTarefas.innerHTML = '';
            data.forEach(tarefa => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');

                li.textContent = tarefa.descricao;

                const porcentagem = calcularPorcentagem(tarefa.dataInicio, tarefa.dataLimite);
                li.textContent += ` - Progresso: ${porcentagem}%`;

                const progressoDiv = document.createElement('div');
                progressoDiv.classList.add('progress');

                const progressoBar = document.createElement('div');
                progressoBar.classList.add('progress-bar');
                progressoBar.style.width = `${porcentagem}%`;
                progressoBar.setAttribute('role', 'progressbar');
                progressoBar.setAttribute('aria-valuenow', porcentagem);
                progressoBar.setAttribute('aria-valuemin', '0');
                progressoBar.setAttribute('aria-valuemax', '100');
                progressoBar.textContent = `${porcentagem}%`;

                progressoDiv.appendChild(progressoBar);
                li.appendChild(progressoDiv);
                listaTarefas.appendChild(li);
            });
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

    document.getElementById('salvar-tarefa-btn').addEventListener('click', function () {
        const descricao = document.getElementById('descricao-tarefa').value;

        if (descricao) {
            fetch('http://localhost:8080/tarefas/add', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Incluindo o token no cabeçalho
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
