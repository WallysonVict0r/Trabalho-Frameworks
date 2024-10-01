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
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.datepicker');
        var options = {
          format: 'dd/mm/yyyy',  // Define o formato da data
          yearRange: [1900, 2100], // Define o intervalo de anos
          autoClose: true // Fecha o datepicker automaticamente após selecionar
        };
        var instances = M.Datepicker.init(elems, options);
      });

        document.getElementById('salvar-tarefa-btn').addEventListener('click', function () {
            const descricao = document.getElementById('descricao-tarefa').value;
            const dataInicio = document.getElementById('data-inicio').value;
            const dataLimite = document.getElementById('data-limite').value;
            const concluida = document.getElementById('concluida').checked;
    
            if (descricao) {
                const token = localStorage.getItem('token'); 
    
                fetch('http://localhost:8080/tarefa/add', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        descricao: descricao,
                        concluida: concluida,
                        data_inicio: dataInicio,
                        data_limite: dataLimite
                    })
                })
                .then(response => response.json())
                .then(() => {
                    alert('Tarefa adicionada com sucesso!');
                    carregarTarefas(); 
                    var modalInstance = M.Modal.getInstance(document.getElementById('modal-add-tarefa'));
                    modalInstance.close(); // Fecha o modal
                    document.getElementById('modal-add-tarefa').reset(); // Limpa os campos do modal
                })
                .catch(error => console.error('Erro ao adicionar tarefa:', error));
            } else {
                alert('Preencha a descrição da tarefa!');
            }
        });
        carregarTarefas();
    });




