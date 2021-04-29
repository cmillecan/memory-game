import './Game.css';
import React, {useState, useEffect, useLayoutEffect} from "react";
import tiana from "../images/tiana.png";
import anna from "../images/anna.png";
import ariel from "../images/ariel.png";
import aurora from "../images/aurora.png";
import belle from "../images/belle.jpg";
import elsa from "../images/elsa.jpg";
import jasmine from "../images/jasmine.png";
import moana from "../images/moana.png";
import mulan from "../images/mulan.png";
import pocahontas from "../images/pocahontas.png";
import rapunzel from "../images/rapunzel.png";
import raya from "../images/raya.jpeg";
import shuffle from "lodash/shuffle";
import Modal from "./Modal";

function Game(props) {
  const { matchCount } = props
  const [openCard, setOpenCard] = useState([])
  const [matched, setMatched] = useState(new Set())
  const [princessPairs, setPrincessPairs] = useState([])
  const [show, setShow] = useState(false)
  const [countMove, setCountMove] = useState(0)

  const princesses = [
    { id: 0, name: 'Tiana', src: tiana },
    { id: 1, name: 'Anna', src: anna },
    { id: 2, name: 'Ariel', src: ariel },
    { id: 3, name: 'Aurora', src: aurora },
    { id: 4, name: 'Belle', src: belle },
    { id: 5, name: 'Elsa', src: elsa },
    { id: 6, name: 'Jasmine', src: jasmine },
    { id: 7, name: 'Moana', src: moana },
    { id: 8, name: 'Mulan', src: mulan },
    { id: 9, name: 'Pocahontas', src: pocahontas },
    { id: 10, name: 'Rapunzel', src: rapunzel },
    { id: 11, name: 'Raya', src: raya },
  ]

  useLayoutEffect(() => {
    reset()
    const ps = shuffle(princesses).slice(0, matchCount)
    setPrincessPairs(shuffle([...ps, ...ps]))
  }, [matchCount])

  useEffect(() => {
    const firstMatch = princessPairs[openCard[0]]
    const secondMatch = princessPairs[openCard[1]]

    if (secondMatch) setCountMove(countMove + 1)

    if (secondMatch && firstMatch.id === secondMatch.id) {
      setMatched((currentMatch) => {
        currentMatch.add(firstMatch.id)
        return new Set(currentMatch)
      })
    }

    if (openCard.length === 2) setTimeout(() => setOpenCard([]), 1000)

  }, [openCard])

  useEffect(() => {
    if (matched.size === matchCount) {
      setTimeout(() => setShow(true), 800)
    }
  }, [matched])

  const handleFlip = index => {
    // if the card we just clicked on has already been matched, then return early
    if (matched.has(princessPairs[index].id)) return
    // also check if second chosen card is same index as first card
    if (openCard.length === 1 && openCard[0] === index) return

    setOpenCard((opened) => [...opened, index])
  }

  const reset = () => {
    setOpenCard([])
    setMatched(new Set())
    setCountMove(0)
    setPrincessPairs(shuffle([...princesses, ...princesses]))
  }

  const onClose = () => {
    setShow(false)
    reset()
  }

  return (
    <div>
      { show &&
      <Modal title='Congratulations!' onClose={onClose} show={show}>
        <p>You won!</p>
        <p>You made {countMove} moves</p>
      </Modal>
      }
      <p>Moves: {countMove}</p>
      <div className={matchCount === 8 ? 'cards-easy' : 'cards'}>
        {princessPairs.map((princess, index) => {

          let flipCard = false

          if (openCard.includes(index))
            flipCard = true

          if (matched.has(princess.id))
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

export default Game;
