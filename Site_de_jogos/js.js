$(document).ready(function() {
  //Evento de clique ao clicar no botão enviar
  $('#name-button').click(function(){
    //Alternando a classe hidden 
    $('#two-page').removeClass('hidden');
    $('#two-page').animate({'margin-top': '50px', 'opacity': '1'}); //Animação de entrada

    //Criando váriavel
    nomeUsuario = $('#player-name').val().trim(); //Captura o nome de usuário
    
    //Função para verificar se o nome de usuário foi inserido
    if(nomeUsuario){
      //Oculta a primeira etapa
      $('#main-page').hide(); 

      //Exibe a segunda etapa
      $('#two-page').show();

      //Exibe o texto "Bem-vindo" e nome de usuário na mesma linha
      $('#two-text').show().css({"display": "inline"}); //Exibe na mesma linha
      $('#player-name-final').text( `${nomeUsuario}!`).show().css({"display": "inline"}); // Exibe na mesma linha

      //Exibe o botão "COMEÇAR JOGO"
      $('#start-button').show();
    } else if($('#player-name').val() == ''){
			alert('Por favor, insira o nome!');
			$('#player-name').css({'border': '1px solid red'});
			return false;
		}

    //Exibe o nome do usuário no menu
    $('#player-name-menu').text(`Olá, ${nomeUsuario}`).show(); //Exibe o nome do usuário no menu
    
  }); //Fim do evento de clique do botão enviar("name-button")

  let isNameScaledDown = false; // Variável para rastrear o estado do nome
    function menuAction(action) {
      if (action === 'nome') {
        if (!isNameScaledDown) {
          // Se o nome não estiver diminuído, diminui o tamanho
          $('#player-name-menu').css({"transform": "scale(0.8)"}); // Diminui o tamanho do nome do usuário
          $('#exit-button').show(); // Exibe o botão de sair
          $('#exit-button').animate({'margin-top': '17px', 'opacity': '1'}, 500); //Anima o botão de sair
          isNameScaledDown = true; // Atualiza o estado

        } else {
          // Se o nome já estiver diminuído, aumenta o tamanho
          $('#player-name-menu').css({"transform": "scale(1)"}); // Aumenta o tamanho do nome do usuário
          $('#exit-button').hide(); // Esconde o botão de sair
          isNameScaledDown = false; // Atualiza o estado
        }
      } else if (action === 'exit') {
        // Oculta a página do jogo
        $('#game_area').hide(); 
        // Exibe a página principal
        $('#main-page').show(); 
        // Oculta o nome do usuário e o botão sair
        $('#player-name-area').hide(); 
        // Reseta o tamanho do nome
        $('#player-name-menu').css({"transform": "scale(1)"}); 
        // Reseta o estado
        isNameScaledDown = false; 
        // Recarregar a página
        location.reload();
      } else {
        console.warn('Ação desconhecida: ' + action); // Lida com ações inesperadas
      }
    } // Fim da função menuAction

    //Evento de clique no nome do usuário no menu
    $('#player-name-menu').on('click', function(){
      menuAction('nome');
    }) 

    //Evento de clique no botão  sair
    $('#exit-button').on('click',function(){
      menuAction('exit');
    })

  //Evento de clique no botão "COMEÇAR JOGO"
  $('#start-button').click(function(){
    //Alternando a classe hidden
    $('#game_area').removeClass('hidden'); //Deixando a página do jogo visível

    //Animação da area do jogo
    $('#game_area').animate({'margin-left': '22%', 'opacity': '1'}, 500); //Anima à area do jogo

    //Alterando a visibilidade das páginas
    $('#two-page').hide(); //Oculta a segunda etapa

    //Função Mostrar jogo
    function showGame(gameToshow){
      
      if(gameToshow === 'memory'){ 
        //Alterando o display da página
        $('#memory-game').toggleClass('active'); //Adiciona a classe active ao jogo da memória

        //Alterando a visibilidade da páginas
        $('#jogo_da_velha').hide(); //Oculta o jogo da velha
        $('#choice-game').hide(); //Oculta o titulo de escolha do jogo
        $('.square').hide(); //Oculta a animação dos quadrados
        $('#memory-game').show(); //Exibe o jogo da memória

        //Animação do da area do jogo da memória
        $('#memory-game').animate({'opacity': '1'}) //Anima a area do jogo da memória

        $('#link-memory-game').css({'box-shadow': '1px 2px 2px red'}); //Muda a cor da sombra da imagem
        $('#link-jogo-velha').css({'box-shadow': '1px 2px 2px #000000'}); //Muda a cor da sombra da imagem

      }else if(gameToshow === 'jogo-velha'){
        //Alterando o display da página
        $('#jogo_da_velha').toggleClass('active'); //Adiciona a classe active ao jogo da velha

        //Alterando a visibilidade da páginas
        $('#choice-game').hide(); //Oculta o titulo de escolha do jogo
        $('#memory-game').hide(); //Oculta o jogo da memória
        $('#jogo_da_velha').show(); //Exibe o jogo da velha
        $('.square').show(); //Exibe a animação dos quadrados

        $('#link-jogo-velha').css({'box-shadow': '1px 2px 2px red'}) //Muda a cor da sombra da imagem
        $('#link-memory-game').css({'box-shadow': '1px 2px 2px #000000'}); //Muda a cor da sombra da imagem
      }
    }

    //Evento de clique jogo da memória
    $('#link-memory-game').click(function(){
      showGame('memory');
    })

    //Evento de clique jogo da velha {
      $('#link-jogo-velha').click(function(){
        showGame('jogo-velha');
      })

      //Evento de clique na dificuldade jogo da memória
      $('.difficulty').click(function(){ 
        const difficulty = $(this).data('difficulty'); //Pega a dificuldade selecionada
        initializeGame(difficulty); //Chama a função para inicializar o jogo da memória

      });

      //Função para inicializar o jogo da memória
      function initializeGame(difficulty) {

        const difficultyTitle = { 
          easy: 'Modo: Fácil',
          normal: 'Modo: normal',
          difficult: 'Modo: Difícil'
        };

        //Atualiza o titulo com base na dificuldade
        $('.difficulty_title').text(difficultyTitle[difficulty] || 'Modo: Desconhecido');

        //Alternando a classe hidden
        $('#memoryGame-area').removeClass('hidden memory-area'); //Deixando a página do jogo visível

        //Alterando a visibilidade 
        $('#memory-title').hide();
        $('#difficulty-selection').hide(); //Oculta a seleção de dificuldade
        $('#memoryGame-area').show(); //Exibe o tabuleiro do jogo da memória

        //Configuração do jogo da mémoria com base na dificuldade
        const cardsArray = getCardsArray(difficulty); //Obtém o array de cartas com base na dificuldade

        let firstCard = null;
        let secondCard = null;
        let lockBoard = false;

        //Função para embaralhar as cartas
        function shuffle(array) {
          return array.sort(() => Math.random() - 0.5); //
        }

        //Renderiza as cartas no tabuleiro
        function renderBoard() {
          const shuffledCards = shuffle(cardsArray);
          shuffledCards.forEach((imgSrc) => {
            const card = $(`
              <div class="card" data-image="${imgSrc}">
              <img src="assets/${imgSrc}" alt="card">
              </div>
              `); //Cria uma div com a classe card e um atributo data-image com o valor da imagem
              $('.cards-container').append(card); //Adiciona a div card ao tabuleiro

          }); //Fim do forEach 

        }; //Fim da função renderBoard
        
        //Lógica ao clicar em uma carta
        function handleCardClick(){ //Função para lidar com o clique na carta
          if(lockBoard) return; //Se o tabuleiro estiver bloqueado, retorna
          if ($(this).hasClass('flipped')) return; //Se a carta já estiver virada, retorna

          $(this).addClass('flipped'); //Adiciona a classe

          if (!firstCard) {
            firstCard = $(this);
          } else {
            secondCard = $(this);
            checkMatch();
          }
        }

        //Verifica se as cartas são iguais 
        function checkMatch() {
          const isMatch = firstCard.data('image') === secondCard.data('image');
          if (isMatch) {
            resetTurn();
          } else {
            lockBoard = true;
            setTimeout(() => {
              firstCard.removeClass('flipped');
              secondCard.removeClass('flipped');
              resetTurn();
            }, 1000); //1000 segundos = 1 segundo
          } 
        }

        //Reseta o turno 
        function resetTurn(){
          [firstCard, secondCard] = [null, null];
          lockBoard = false;
        }

        //Inicializa o jogo
        renderBoard();
        $("#memoryGame-area").on("click", ".card", handleCardClick);
      }

      //Função para obter o array de cartas com base na dificuldade
      function getCardsArray(difficulty){
        switch (difficulty){
          case 'easy':
            return [
              'charmander.webp', 'pikachu-plakat.webp', 'Raichu.webp', 'squritle.jpg',
              'charmander.webp', 'pikachu-plakat.webp', 'Raichu.webp', 'squritle.jpg',
            ];
          case 'normal':
            return [
              //Cartas para a dificuldade média
            ];
          case 'hard':
          return [
            //Cartas para a dificuldade difícil
          ];
          default: 
          return [];
        }
      } //Função getCards

      //Evento de clique no botão voltar
      $('#back_button').click(function(){
        //Oculta a área do jogo
        $('#memoryGame-area').hide(); 

        //Exibe a seleção de dificuldade
        $('#difficulty-selection').show();

        //Limpa o conteúdo do tabuleiro e do título da dificuldade
        $('.cards-container').empty(); //Limpa as cartas
        $('.difficulty_title').text(''); //Limpa o titulo da dificuldade 
      })
        
  }); //Fim do evento de clique do botão "COMEÇAR JOGO"

  //Square animation - página do jogo da velha
  const numSquares = 20;
  const gameArea = document.getElementById('game_area');

  for(let i = 0; i < numSquares; i++){
    const square = document.createElement('div');
    square.className = 'square';
    
    //Gera posições aleatórias
    const top = Math.random() * 80 + 10; //Entre 10% e 90%
    const left = Math.random() * 80 + 5; //Entre 10% e 90%
    
    square.style.top = `${top}%`;
    square.style.left = `${left}%`;
    
    //Adiciona um delay aleatório para à animação
    const delay = Math.random() * 2; //Define o tempo de 2 segundos
    square.style.animationDelay = `${delay}s`;
    
    gameArea.appendChild(square);
  }
})
