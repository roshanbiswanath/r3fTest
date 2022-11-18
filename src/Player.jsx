import React from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useController, useXR } from '@react-three/xr'


function Player() {
    const left = useController('left')
    const right = useController('right')
    const XRplayer = useXR().player
    console.log(XRplayer.children[0])
    const direction = new THREE.Vector3()
    const rightDir = new THREE.Vector3()
    useFrame((delta) => {
      let fSpeed = 0;
      let rSpeed = 0;
      if (right && right.inputSource){
        fSpeed = right.inputSource.gamepad.axes[3]*(-1)
        rSpeed = right.inputSource.gamepad.axes[2]*(-1)
        //console.log(left.inputSource.gamepad.axes)
        //console.log(fSpeed)
      }
    XRplayer.children[0].getWorldDirection(direction)
    direction.y = 0
    rightDir.x = direction.z
    rightDir.z = -direction.x
    XRplayer.position.addScaledVector(rightDir, rSpeed)
    XRplayer.position.addScaledVector(direction, fSpeed)
    })
    //console.log(left.inputSource.gamepad.axes)
  return (
    <>
    </>
  )
}

export default Player