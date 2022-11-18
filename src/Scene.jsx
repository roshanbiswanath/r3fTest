import React from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {Suspense} from 'react'
import { Html, useProgress} from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}
function Scene() {
    const gltf = useLoader(OBJLoader,'jagannathPuri.obj')
  return (
  <Suspense fallback={Loader()}>
    <primitive object={gltf} />
  </Suspense>
  )
}

export default Scene