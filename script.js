
const section=document.querySelector('section')
const playerLivesCount=document.querySelector('span')
let playerLives=6
let winningMessageTextElement=document.querySelector('[data-winning-message-text]')
let winningMessageElement=document.querySelector('#winningMessage')
const restartButton=document.getElementById('restartButton')
playerLivesCount.innerHTML=playerLives

const getData=()=>[
  { imgSrc: "./images/beatles.jpeg", id: 1, name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", id: 2, name: "blink 182" },
  { imgSrc: "./images/fkatwigs.jpeg", id: 3, name: "fka twigs" },
  { imgSrc: "./images/fleetwood.jpeg", id: 4, name: "fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", id: 5, name: "joy division" },
  { imgSrc: "./images/ledzep.jpeg", id: 6, name: "lep zeppelin" },
  { imgSrc: "./images/metallica.jpeg", id: 7, name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", id: 8, name: "pink floyd" },
  { imgSrc: "./images/beatles.jpeg", id: 9, name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", id: 10, name: "blink 182" },
  { imgSrc: "./images/fkatwigs.jpeg", id: 11, name: "fka twigs" },
  { imgSrc: "./images/fleetwood.jpeg", id: 12, name: "fleetwood" },
  { imgSrc: "./images/joy-division.jpeg", id: 13, name: "joy division" },
  { imgSrc: "./images/ledzep.jpeg", id: 14, name: "lep zeppelin" },
  { imgSrc: "./images/metallica.jpeg", id: 15, name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", id: 16, name: "pink floyd" },
]

const randomize=()=>{
  const cardData=getData()
  cardData.sort(()=>Math.random()-0.5)
  return cardData
}

const cardGenerator=()=>{
  const cardData=randomize()
  cardData.forEach((item) => {
    const card=document.createElement('div')
    const face=document.createElement('img')
    const back=document.createElement('div')

    card.classList="card"
    face.classList="face"
    back.classList="back"
    
    face.src=item.imgSrc
    card.setAttribute('name',item.name)

    section.appendChild(card)
    card.appendChild(face)
    card.appendChild(back)
    card.classList.add('toggleCard')
    setTimeout(()=>card.classList.remove('toggleCard'),1000)
    card.addEventListener('click',(e)=>{
      card.classList.toggle('toggleCard')
      // face.classList.toggle("toggleCard")
      checkCards(card)
    })
  })
}

const checkCards=(e)=>{
  const cards=document.querySelectorAll('.card')
  const clickedCard=e
  console.log(clickedCard)
  clickedCard.classList.add('flipped')
  const flippedCards=document.querySelectorAll('.flipped')
  const toggleCards=document.querySelectorAll('.toggleCard')

    if(flippedCards.length===2){
      cards.forEach(card=>{
        card.classList.add('unclickable')
        setTimeout(()=>card.classList.remove('unclickable'),1100)
      })
      if(flippedCards[0].getAttribute('name')===flippedCards[1].getAttribute('name')){
        console.log('match')
        flippedCards.forEach(card=>{
          card.classList.remove('flipped')
          card.style.pointerEvents='none'
        })
      }
        else{
          console.log('wrong')
          flippedCards.forEach(card=>{
            card.classList.remove('flipped')
            setTimeout(()=>card.classList.remove('toggleCard'),1000)
        })
        playerLives--;
        console.log(playerLives)
        playerLivesCount.innerHTML=playerLives
        if(playerLives===0){
          endGame(true)
          // alert("YOU LOST...CLICK OK TO RESTART")
          // setTimeout(restart,500)
        }
        }

        if(toggleCards.length===16)
        { 
          endGame(false)
          // setTimeout(()=>{ alert("YOU WIN")},1500)
        }

    }
}

const restart=()=>{
  window.location.reload() 
}

cardGenerator()

restartButton.addEventListener('click',restart)

function endGame(lost){
  if(lost){
    winningMessageTextElement.innerHTML=`YOU LOST`
  }else {
    winningMessageTextElement.innerHTML=`You Win!`
  }
  winningMessageElement.classList.add('show')
}