const clear = document.getElementById('clear');
const showBtn = document.getElementById('show');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const addContainer = document.getElementById('add-container');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const cardsContainer = document.getElementById('cards-container');
const currentEl = document.getElementById('current');

//keep track of card number 
let currentActiveCard = 0;

//store DOM cards
const cardsEl =[]

//data for cards

// set cards data
const cardsData =getCardsData();

// const cardsData =[
//       {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

//add crad to Dom
function createCards(){
    cardsData.forEach((data,index) => createCard(data,index));
}

//start to addcarts
function createCard(data,index){
    const card = document.createElement('div');
    card.classList.add('card');

    if(index === 0){
        card.classList.add('active');
    }
    card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
      <p>
        ${data.question}
      </p>
    </div>
    <div class="inner-card-back">
      <p>
        ${data.answer}
      </p>
    </div>
  </div>
    `;
  //flip over card 
  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  //push it to array
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
}

createCards();

//show the number of cards
function updateCurrentText(){
    currentEl.innerText =`${currentActiveCard +1 } / ${cardsEl.length}`;
}
//get card to localstorage
function getCardsData(){
    const cards =JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards ;
}
//add card to local storage
function setCardsData(cards){
    localStorage.setItem('cards',JSON.stringify(cards));
    window.location.reload();
}

//event listeners


//inser and pop up the show add
showBtn.addEventListener('click', () => addContainer.classList.add('show') );

//close the insert data container ]
hideBtn.addEventListener('click',() => addContainer.classList.remove('show'));

//next button event
nextBtn.addEventListener('click' , () => {
    cardsEl[currentActiveCard].className = 'card left';
    currentActiveCard = currentActiveCard +1 ;

    if(currentActiveCard > cardsEl.length -1){
        currentActiveCard =cardsEl.length -1 ;
    }

    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
});
//previous button event
prevBtn.addEventListener('click' , () => {
    cardsEl[currentActiveCard].className = 'card right';
    currentActiveCard = currentActiveCard -1 ;

    if(currentActiveCard < 0){
        currentActiveCard =0 ;
    }

    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
});

//event  on add card
addCardBtn.addEventListener('click',() => {
    const question = questionEl.value;
    const answer = answerEl.value;
    // console.log(question,answer);
    if(question.trim() && answer.trim() ){
        const newCard = {question , answer};

        createCards(newCard);

        questionEl.value ='';
        answerEl.value = '';

          addCardBtn.classList.remove('show');

          cardsData.push(newCard);
          setCardsData(cardsData);
    }
});

//event for clearing the cards
clear.addEventListener('click', ()=>{
    localStorage.clear();
    cardsContainer.innerHTML ='';
    window.location.reload();
});
