document.addEventListener('DOMContentLoaded', function() {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  function carregarHabitos() {
      const token = localStorage.getItem('token'); // Obtendo o token armazenado

      fetch('http://localhost:8080/habitos/all', {
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
          console.log('Dados de hábitos:', data);
          const listaHabitos = document.getElementById('lista-habitos');

          if (listaHabitos) {
              listaHabitos.innerHTML = '';

              if (Array.isArray(data)) {
                  for (const habito of data) {
                      if (habito && habito.descricao) { 
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

  function adicionarHabito() {
      document.getElementById('form-habito').addEventListener('submit', function(event) {
          event.preventDefault();
          const descricaoHabito = document.getElementById('descricao_habito').value;
          const idUsuario = "a31f2434-177f-4fdf-bcbe-35e387f4ef4f"; // Obtendo ID do usuário
          const token = localStorage.getItem('token'); 

          fetch('http://localhost:8080/habitos/add', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` // Incluindo o token no cabeçalho
              },
              body: JSON.stringify({      // Incluindo ID do hábito
                  id_usuario: idUsuario, // Incluindo ID do usuário
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
              M.toast({ html: 'Hábito adicionado com sucesso!' });
              carregarHabitos(); // Carregar hábitos após adicionar
              // Opcional: Limpar os campos do formulário após a adição
              document.getElementById('form-habito').reset();
          })
          .catch(error => console.error('Erro ao adicionar hábito:', error));
      });
  }

  // Inicialização das funções
  carregarHabitos();
  adicionarHabito();
});