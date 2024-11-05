"use client"
import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
const db = [
    {
        img : "hi1",
        title : "Title 1",
        desc:"hello",

    },
    {
        img : "hi2",
        title : "Title 2",
        desc:"hello",

    },
    {
        img : "hi3",
        title : "Title 3",
        desc:"hello",

    },
    
]

function Cards () {
    const [currentIndex, setCurrentIndex] = useState(db.length - 1)
    const [lastDirection, setLastDirection] = useState()
    const currentIndexRef = useRef(currentIndex)
  
    const childRefs = useMemo(
      () =>
        Array(db.length)
          .fill(0)
          .map((i) => React.createRef()),
      []
    )
  
    const updateCurrentIndex = (val) => {
      setCurrentIndex(val)
      currentIndexRef.current = val
    }
  
    const canGoBack = currentIndex < db.length - 1
  
    const canSwipe = currentIndex >= 0
  
    const swiped = (direction, nameToDelete, index) => {
      setLastDirection(direction)
      updateCurrentIndex(index - 1)
    }
  
    const outOfFrame = (name, idx) => {
      console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
      currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }
  
    const swipe = async (dir) => {
      if (canSwipe && currentIndex < db.length) {
        await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
      }
    }
  
    const goBack = async () => {
      if (!canGoBack) return
      const newIndex = currentIndex + 1
      updateCurrentIndex(newIndex)
      await childRefs[newIndex].current.restoreCard()
    }
  
    return (
      <div>
        
        
        <div className='h-96 mx-auto my-10 w-1/2 border'>
          {db.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className='absolute bg-white rounded-lg text-black border h-80 w-[30%] m-10'
              key={index}
              onSwipe={(dir) => swiped(dir, character.name, index)}
              onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
               
            </TinderCard>
          ))}
        </div>
        <div className='m-auto border w-20 bg-slate-800'>
          <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        </div>
        
      </div>
    )
  }
  
  export default Cards