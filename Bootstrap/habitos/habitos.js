document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    new bootstrap.Modal(modal);
  });

  function carregarHabitos() {
    const token = localStorage.getItem('token'); 

    fetch('http://localhost:8080/habitos/all', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
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
          for (const habito of data) {
            if (habito && habito.descricao) { 
              const li = document.createElement('li');
              li.classList.add('list-group-item'); // Classe do Bootstrap
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

  function adicionarHabito() {
    document.getElementById('form-habito').addEventListener('submit', function(event) {
      event.preventDefault();
      const descricaoHabito = document.getElementById('descricao_habito').value;
      const token = localStorage.getItem('token'); 

      fetch('http://localhost:8080/habitos/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({      
          descricao: descricaoHabito
        }) 
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta da rede');
        }
        return response.json();
      })
      .then(data => {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        
        if (alertPlaceholder) {
          const alert = document.createElement('div');
          alert.className = 'alert alert-success';
          alert.role = 'alert';
          alert.innerText = 'Hábito adicionado com sucesso!';
          alertPlaceholder.appendChild(alert);
          
          setTimeout(() => {
            alert.remove();
          }, 3000);
        } else {
          console.error('Elemento liveAlertPlaceholder não encontrado.');
        }
      
        carregarHabitos(); 
        document.getElementById('form-habito').reset();
      });
  });
  }

  carregarHabitos();
  adicionarHabito();
});