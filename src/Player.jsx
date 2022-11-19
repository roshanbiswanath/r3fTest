import React, { useRef } from 'react'
import * as THREE from 'three'

import { useFrame, useThree } from '@react-three/fiber'
import { useController, useXR } from '@react-three/xr'
import { useKeyboardControls } from "@react-three/drei"
import { useBox } from '@react-three/cannon'
import { PerspectiveCamera } from '@react-three/drei'

function Player() {
  const [ref, api] = useBox(() => ({
    mass: 0,
    type: "dynamic",
    position: [100, 10, -100],
    material: {
      friction: 0,
      restitution: 1
    }
  }), useRef(null))
  //console.log(ref.current.position)
  const { camera } = useThree()
  // camera.position.set(
  //   ref.current.position.x,
  //   ref.current.position.y + 1.6,
  //   ref.current.position.z
  // );
  camera.position.set(0, 0, 0)
  const left = useController('left')
  const right = useController('right')
  const XRplayer = useXR().player
  const direction = new THREE.Vector3()
  const rightDir = new THREE.Vector3()
  const [, get] = useKeyboardControls()
  useFrame((delta) => {
    // console.log(camera.position)
    // console.log(XRplayer.children[0].position)
    // if (ref && ref.current) {
    //   console.log(ref.current.position)
    //   //console.log(camera.position)
    // }
    const { forward, backward, left, right, jump } = get()
    let fValue = forward ? 1 : 0
    let bValue = backward ? -1 : 0
    let lValue = left ? 1 : 0
    let rValue = right ? -1 : 0
    let fSpeed = 0;
    let rSpeed = 0;
    fSpeed = fValue + bValue
    rSpeed = lValue + rValue
    if (right && right.inputSource) {
      fSpeed = right.inputSource.gamepad.axes[3] * (-1)
      rSpeed = right.inputSource.gamepad.axes[2] * (-1)
      //console.log(left.inputSource.gamepad.axes)
      //console.log(fSpeed)
    }
    camera.getWorldDirection(direction)
    direction.y = 0
    rightDir.x = direction.z
    rightDir.z = -direction.x
    XRplayer.position.addScaledVector(rightDir, rSpeed)
    XRplayer.position.addScaledVector(direction, fSpeed)
  })
  //console.log(left.inputSource.gamepad.axes)
  return (
    <>
      <PerspectiveCamera ref={ref} makeDefault position={[0, 1.6, 0]} />
    </>
  )
}

export default Player