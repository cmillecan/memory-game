import './App.css';
import React, {useState, useEffect, useLayoutEffect} from "react";
import anna from './images/anna.png'
import ariel from './images/ariel.png'
import aurora from './images/aurora.png'
import belle from './images/belle.jpg'
import cinderella from './images/cinderella.jpg'
import jasmine from './images/jasmine.png'
import moana from './images/moana.png'
import mulan from './images/mulan.png'
import pocahontas from './images/pocahontas.png'
import rapunzel from './images/rapunzel.png'
import raya from './images/raya.jpeg'
import tiana from './images/tiana.png'
import shuffle from 'lodash/shuffle'

function App() {
  const [openCard, setOpenCard] = useState([])
  const [matched, setMatched] = useState([])
  const [princessPairs, setPrincessPairs] = useState([])

  const princesses = [
    { id: 0, name: 'Tiana', src: tiana },
    { id: 1, name: 'Anna', src: anna },
    // { id: 2, name: 'Ariel', src: ariel },
    // { id: 3, name: 'Aurora', src: aurora },
    // { id: 4, name: 'Belle', src: belle },
    // { id: 5, name: 'Cinderella', src: cinderella },
    // { id: 6, name: 'Jasmine', src: jasmine },
    // { id: 7, name: 'Moana', src: moana },
    // { id: 8, name: 'Mulan', src: mulan },
    // { id: 9, name: 'Pocahontas', src: pocahontas },
    // { id: 10, name: 'Rapunzel', src: rapunzel },
    // { id: 11, name: 'Raya', src: raya },
  ]

  // we use useLayoutEffect so that the pairs are all shuffled and set before we even 'paint'
  // to the dom. 'paint' here means to allow react to write to the DOM.
  useLayoutEffect(() => {
    setPrincessPairs(shuffle([...princesses, ...princesses]))
  }, [])

  useEffect(() => {
    const firstMatch = princessPairs[openCard[0]]
    const secondMatch = princessPairs[openCard[1]]

    if (secondMatch && firstMatch.id === secondMatch.id) {
      setMatched([...matched, firstMatch.id])
    }

    if (openCard.length === 2) setTimeout(() => setOpenCard([]), 1000)

  }, [openCard])

  useEffect(() => {
    if (matched.length === princesses.length) {
      /*
      TODO: Connie - handle win state! DONT use 'alert' though, that's too 90s
       */
      setTimeout(() => alert("You won!"), 500)
    }
  }, [matched])

  const handleFlip = index => {
    // if the card we just clicked on has already been matched, then return early
    if (matched.includes(princessPairs[index].id)) return
    // also check if second chosen card is same index as first card
    if (openCard.length === 1 && openCard[0] === index) return

    setOpenCard((opened) => [...opened, index])
  }

  return (
    <div className="App">
      <p>Memory Game</p>
      <div className='cards'>
        {princessPairs.map((princess , index) => {

          let flipCard = false

          if (openCard.includes(index))
            flipCard = true

          if (matched.includes(princess.id))
            flipCard = true

          return (
            <div className={`princess-card ${flipCard ? 'flipped' : ''}`}
                 key={index}
                 onClick={() => handleFlip(index)}

            >
              <div className='inner'>
                <div className='front'>
                  <img
                    src={princess.src}
                    alt='princess'
                    width='100'
                  />
                </div>
                <div className='back'></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;

