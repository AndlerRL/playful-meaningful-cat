import React from 'react';
import { Cat } from '../cat/cat.component';
import './scenario.css';

export function Scenario() {

  React.useEffect(() => {
    const catWrapper = document.querySelector('.cat_wrapper') as HTMLDivElement
    const scenarioWrapper = document.querySelector('.outer_wrapper') as HTMLDivElement
    const cat = document.querySelector('.cat') as HTMLDivElement
    const catHead = document.querySelector('.cat_head') as HTMLDivElement
    const catLegs = document.querySelectorAll('.leg') as NodeListOf<HTMLDivElement>

    console.log('Components', { catWrapper, scenarioWrapper, cat, catHead, catLegs })

    const pos = {
      x: 0,
      y: 0,
    }

    const walk = () =>{
      cat.classList.remove('first_pose')
      
      catLegs.forEach(leg =>
        leg.classList.add('walk')
      )
    }

    const handleMouseMotion = (e: MouseEvent) => {
      console.log('started', { x: e.clientX, y: e.clientY })

      pos.x = e.clientX
      pos.y = e.clientY

      walk()
    }

    const handleTouchMotion = (e: MouseEvent) =>{
      if (!(e as unknown as TouchEvent).targetTouches) return

      pos.x = ((e as unknown as TouchEvent).targetTouches[0] as unknown as MouseEvent).offsetX
      pos.y = ((e as unknown as TouchEvent).targetTouches[0] as unknown as MouseEvent).offsetY

      walk()
    }

    const turnRight = () =>{
      cat.style.left = `${pos.x - 90}px`
      cat.classList.remove('face_left')
      cat.classList.add('face_right')
    }

    const turnLeft = () =>{
      cat.style.left = `${pos.x + 10}px`
      cat.classList.remove('face_right')
      cat.classList.add('face_left')
    }

    const decideTurnDirection = () =>{
      cat.getBoundingClientRect().x < pos.x ?
        turnRight()
        :
        turnLeft()
    }

    const headMotion = () =>{
      pos.y > (scenarioWrapper.clientHeight - 100)
        ? catHead.style.top = '-15px'
        : catHead.style.top = '-30px'
    }

    const jump = () =>{
      catWrapper.classList.remove('jump')

      if (pos.y < (scenarioWrapper.clientHeight - 250)) {
        const timeout = setTimeout(()=>{
          catWrapper.classList.add('jump')

          clearTimeout(timeout)
        },100)
      } 
    }

    const decideStop = ()=>{
      if (cat.classList.contains('face_right') && pos.x - 90 === cat.offsetLeft ||
          cat.classList.contains('face_left') && pos.x + 10 === cat.offsetLeft) {
        catLegs.forEach(leg=>leg.classList.remove('walk'))    
      }
    }
    
    setInterval(()=>{
      if (!pos.x || !pos.y) return
      decideTurnDirection()
      headMotion()
      decideStop()
    },100)

    setInterval(()=>{
      if (!pos.x || !pos.y) return

      jump()
    }, 1000)
    
    document.addEventListener('mousemove', handleTouchMotion)
    document.addEventListener('mousemove', handleMouseMotion)
  }, [])

  return (
    <>
      <div className="outer_wrapper">
        <div className="wrapper">
          <Cat />
        </div>

        <div className="ground"></div>
      </div>
    </>
  )
}