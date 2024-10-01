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
                li.classList.add('collection-item');
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

    
    var dateElems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(dateElems, {
        format: 'yyyy-mm-dd',
        autoClose: true
    });

    var timeElems = document.querySelectorAll('.timepicker');
    M.Timepicker.init(timeElems, {
        twelveHour: false, 
        autoClose: true
    });

    
    function formatarDataHora(data, hora) {
        const [horas, minutos] = hora.split(':');
        const dataFormatada = new Date(data);
        dataFormatada.setHours(horas);
        dataFormatada.setMinutes(minutos);
        return dataFormatada.toISOString().slice(0, 19); 
    }

   
    document.getElementById('salvar-tarefa-btn').addEventListener('click', function () {
        const descricao = document.getElementById('descricao-tarefa').value;
        const dataInicio = document.getElementById('data-inicio').value;
        const horaInicio = document.getElementById('hora-inicio').value;
        const dataLimite = document.getElementById('data-limite').value;
        const horaLimite = document.getElementById('hora-limite').value;
        const concluida = document.getElementById('concluida').checked;

        if (descricao && dataInicio && horaInicio && dataLimite && horaLimite) {
            const token = localStorage.getItem('token');

            const dataHoraInicio = formatarDataHora(dataInicio, horaInicio);
            const dataHoraLimite = formatarDataHora(dataLimite, horaLimite);

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
            .then(response => response.json())
            .then(() => {
                M.toast({ html: 'Tarefa adicionada com sucesso!' });
                carregarTarefas(); 
                var modalInstance = M.Modal.getInstance(document.getElementById('modal-add-tarefa'));
                modalInstance.close(); // Fecha o modal
                document.getElementById('descricao-tarefa').value = '';
                document.getElementById('data-inicio').value = '';
                document.getElementById('hora-inicio').value = '';
                document.getElementById('data-limite').value = '';
                document.getElementById('hora-limite').value = '';
                document.getElementById('concluida').checked = false; 
            })
            .catch(error => console.error('Erro ao adicionar tarefa:', error));
        } else {
            alert('Preencha todos os campos!');
        }
    });

    carregarTarefas();
});
