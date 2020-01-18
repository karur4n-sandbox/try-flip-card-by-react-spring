import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root')

  ReactDOM.render(<App />, rootEl)
})

const App: React.FC = () => {
  const [flip, setFlip] = useState(false)
  const { opacity, transform } = useSpring({
    opacity: flip ? 1 : 0,
    transform: `rotateY(${flip ? 180 : 0}deg)`,
    // config についてここに載ってる
    // https://www.react-spring.io/docs/hooks/api
    // 下の調整あるのとないのでそんなに差があるかな？笑
    // mass はバネの質量で、アニメーションの速度に関わりそう
    // tension はバネの張力で、これもまたアニメーションの速度に関わりそう
    // friction は抵抗。この値を低くするとずっとポヨンポヨンしてる
    config: { mass: 5, tension: 500, friction: 80 }, // ぜんぜんアニメーションの違いわからない。。。
  })

  return (
    <div style={{ display: 'flex' }}>
      <div onClick={() => setFlip((prev) => !prev)}>
        <AnimatedCardContainer
          style={{
            opacity: opacity.interpolate((o: any) => 1 - o),
            transform,
          }}
        >
          <Card>
            <img
              src={
                'https://images.unsplash.com/photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i&auto=format&fit=crop'
              }
              alt={'裏面'}
            />
          </Card>
        </AnimatedCardContainer>
        <AnimatedCardContainer
          style={{
            opacity,
            transform: transform.interpolate(
              (t: any) => `${t} rotateX(180deg)`
            ),
          }}
        >
          <Card>
            <img
              src={
                'https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80&auto=format&fit=crop'
              }
              alt={'裏面'}
            />
          </Card>
        </AnimatedCardContainer>
      </div>
    </div>
  )
}

const Card = styled.div`
  font-weight: bold;
  text-align: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  max-width: 480px;
  width: 900px;
  position: relative;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  > img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const AnimatedCardContainer = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
`
