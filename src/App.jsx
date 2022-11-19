import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import { OrbitControls } from '@react-three/drei';
import { PerspectiveCamera, KeyboardControls } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import Player from './Player';
import { Physics, Debug } from '@react-three/cannon'

function App() {
  return (
    // <div className="App">
    //   <Canvas>
    //     <PerspectiveCamera makeDefault position={[0, 0, 5]} />
    //     <pointLight position={[100, 100, 100]} />
    //     <Scene/>
    //   </Canvas>
    // </div>
    //Edit
    <>
      <VRButton />
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["a", "A"] },
          { name: "right", keys: ["d", "D"] },
          { name: "jump", keys: ["Space"] },
          { name: "rLeft", keys: ["ArrowLeft"] },
          { name: "rRight", keys: ["ArrowRight"] }
        ]}>
        <Canvas shadows camera={{ fov: 45 }}>
          <Physics>
            <Debug color="black" scale={2} >
              <XR>
                <Hands />
                <Controllers />
                <pointLight position={[100, 100, 100]} />
                <ambientLight />
                <Player />
                <Scene />
              </XR>
            </Debug>
          </Physics>
        </Canvas>
      </KeyboardControls>
    </>
  )
}

export default App
