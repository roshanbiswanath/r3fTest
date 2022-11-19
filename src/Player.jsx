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
    type: "static",
    position: [100, 10, -100],
    material: {
      friction: 0,
      restitution: 1
    }
  }), useRef(null))
  //console.log(ref.current.position)
  const { camera } = useThree()
  // camera.position.set(100, 10, -100)
  // camera.position.set(
  //   ref.current.position.x,
  //   ref.current.position.y + 1.6,
  //   ref.current.position.z
  // );
  camera.position.set(0, 15, 0)
  const left = useController('left')
  const right = useController('right')
  // console.log(useXR())
  const XRplayer = useXR().player
  // console.log(XRplayer)
  const direction = new THREE.Vector3()
  const rightDir = new THREE.Vector3()
  const [, get] = useKeyboardControls()
  XRplayer.position.set(0, 5, 0)
  useFrame((delta) => {
    //console.log(camera.position)
    // console.log(XRplayer.position)
    // XRplayer.children[0].lookAt(0, 0, 0)
    // XRplayer.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01)
    // if (ref && ref.current) {
    //   console.log(ref.current.position)
    //   //console.log(camera.position)
    // }
    const { forward, backward, jump, rLeft, rRight } = get()
    const leftIn = get().left
    const rightIn = get().right
    let fValue = forward ? 1 : 0
    let bValue = backward ? -1 : 0
    let lValue = leftIn ? 1 : 0
    let rValue = rightIn ? -1 : 0
    let rRValue = rRight ? 1 : 0
    let rLValue = rLeft ? -1 : 0
    let fSpeed = 0;
    let rSpeed = 0;
    let rotate = 0
    fSpeed = fValue + bValue
    rSpeed = lValue + rValue
    rotate = rRValue + rLValue
    // console.log(rotate)
    if (left && left.inputSource) {
      fSpeed = left.inputSource.gamepad.axes[3] * (-1)
      rSpeed = left.inputSource.gamepad.axes[2] * (-1)
      // console.log(left.inputSource.gamepad.axes)
      // console.log(fSpeed, rSpeed)
    }
    if (right && right.inputSource) {
      rotate = right
      .inputSource.gamepad.axes[2]
    }
    XRplayer.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotate * 0.01 * (-1))

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
      <PerspectiveCamera makeDefault position={[0, 10, 0]} />
    </>
  )
}

export default Player