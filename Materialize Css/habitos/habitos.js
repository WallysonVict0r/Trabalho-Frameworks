document.addEventListener('DOMContentLoaded', function() {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  function carregarHabitos() {
    fetch('http://localhost:8080/habitos/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta da rede');
        }
        return response.json();
      })
      .then(data => {
        console.log('Dados de hábitos:', data);
        const listaHabitos = document.getElementById('lista-habitos');
        
        if (listaHabitos) {
          listaHabitos.innerHTML = '';

          if (Array.isArray(data)) {
            // Iterando sobre os hábitos
            for (const habito of data) {
              if (habito && habito.descricao) {  // Verificação de 'descricao'
                const li = document.createElement('li');
                li.classList.add('collection-item');
                li.textContent = habito.descricao;
                listaHabitos.appendChild(li);
              } else {
                console.error('Hábito mal formado:', habito);
              }
            }
          } else {
            console.error('Os dados de hábitos não são um array válido:', data);
          }
        } else {
          console.error('Elemento listaHabitos não encontrado no DOM');
        }
      })
      .catch(error => console.error('Erro ao carregar hábitos:', error));
  }

  function carregarHistoricoHabitos() {
    fetch('http://localhost:8080/habito-historico/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta da rede');
        }
        return response.json();
      })
      .then(data => {
        console.log('Dados de histórico:', data);
        const historicoList = document.getElementById('historico-habitos');

        if (historicoList) {
          historicoList.innerHTML = '';

          if (Array.isArray(data)) {
            // Iterando sobre o histórico
            for (const historico of data) {
              if (historico && historico.habito && historico.data) {  // Verificação de 'habito' e 'data'
                const li = document.createElement('li');
                li.classList.add('collection-item');
                li.textContent = `Hábito ID: ${historico.habito} - Data: ${historico.data}`;
                historicoList.appendChild(li);
              } else {
                console.error('Histórico mal formado:', historico);
              }
            }
          } else {
            console.error('Os dados de histórico não são um array válido:', data);
          }
        } else {
          console.error('Elemento historicoList não encontrado no DOM');
        }
      })
      .catch(error => console.error('Erro ao carregar histórico de hábitos:', error));
  }

  function adicionarHabito() {
    document.getElementById('form-habito').addEventListener('submit', function(event) {
      event.preventDefault();
      const descricaoHabito = document.getElementById('descricao_habito').value;
  
      fetch('http://localhost:8080/habito/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:5, descricao: descricaoHabito, id_usuario: 1 }) // Adicionando id_usuario fixo
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta da rede');
        }
        return response.json();
      })
      .then(data => {
        M.toast({html: 'Hábito adicionado com sucesso!'});
        carregarHabitos(); // Recarregar a lista de hábitos
        carregarHistoricoHabitos(); // Recarregar o histórico de hábitos
      })
      .catch(error => console.error('Erro ao adicionar hábito:', error));
    });
  }

  // Carregar hábitos e histórico ao inicializar a página
  carregarHabitos();
  carregarHistoricoHabitos();
  adicionarHabito();
});
