import React, { useRef } from "react";
import * as THREE from "three";

import { useFrame, useThree } from "@react-three/fiber";
import { useController, useXR } from "@react-three/xr";
import { useKeyboardControls } from "@react-three/drei";
// import { useBox } from "@react-three/cannon";
import { PerspectiveCamera } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";

function Player() {
  // const [ref, api] = useBox(
  //   () => ({
  //     mass: 0,
  //     type: "static",
  //     position: [0, 10, 0],
  //     material: {
  //       friction: 0,
  //       restitution: 1,
  //     },
  //   }),
  //   useRef(null)
  // );
  //console.log(ref.current.position)
  const { camera } = useThree();
  // camera.position.set(100, 10, -100)
  // camera.position.set(
  //   ref.current.position.x,
  //   ref.current.position.y + 1.6,
  //   ref.current.position.z
  // );
  camera.position.set(0, 3, 0);
  const left = useController("left");
  const right = useController("right");
  // console.log(useXR())
  const XRplayer = useXR().player;
  // console.log(XRplayer)
  const direction = new THREE.Vector3();
  const rightDir = new THREE.Vector3();
  const [, get] = useKeyboardControls();
  XRplayer.position.set(300, 50, -350);
  const ref = useRef();
  useFrame((delta) => {
    //console.log(camera.position)
    // console.log(XRplayer.position)
    // XRplayer.children[0].lookAt(0, 0, 0)
    // XRplayer.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01)
    // if (ref && ref.current) {
    //   console.log(ref.current.position)
    //   //console.log(camera.position)
    // }
    XRplayer.position.set(...ref.current.translation());
    const { forward, backward, jump, rLeft, rRight } = get();
    const leftIn = get().left;
    const rightIn = get().right;
    let fValue = forward ? 1 : 0;
    let bValue = backward ? -1 : 0;
    let lValue = leftIn ? 1 : 0;
    let rValue = rightIn ? -1 : 0;
    let rRValue = rRight ? 1 : 0;
    let rLValue = rLeft ? -1 : 0;
    let fSpeed = 0;
    let rSpeed = 0;
    let rotate = 0;
    fSpeed = fValue + bValue;
    rSpeed = lValue + rValue;
    rotate = rRValue + rLValue;
    // console.log(rotate)
    if (left && left.inputSource) {
      fSpeed = left.inputSource.gamepad.axes[3] * -1;
      rSpeed = left.inputSource.gamepad.axes[2] * -1;
      // console.log(left.inputSource.gamepad.axes)
      // console.log(fSpeed, rSpeed)
    }
    if (right && right.inputSource) {
      rotate = right.inputSource.gamepad.axes[2];
    }
    XRplayer.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotate * 0.01 * -1);

    camera.getWorldDirection(direction);
    direction.y = 0;
    rightDir.x = direction.z;
    rightDir.z = -direction.x;

    ref.current.setLinvel({
      x: (direction.x * fSpeed + rightDir.x * rSpeed) * 10,
      y: 0,
      z: (direction.z * fSpeed + rightDir.z * rSpeed) * 10,
    });
    // ref.current.setLinvel({
    //   x: rightDir.x * rSpeed * 100,
    //   y: 0,
    //   z: rightDir.z * rSpeed * 100,
    // });
    // XRplayer.position.addScaledVector(rightDir, rSpeed);
    // XRplayer.position.addScaledVector(direction, fSpeed);
    console.log(XRplayer.position);
  });
  //console.log(left.inputSource.gamepad.axes)
  return (
    <>
      <RigidBody
        ref={ref}
        colliders={"hull"}
        mass={1}
        type="dynamic"
        position={[
          XRplayer.position.x,
          XRplayer.position.y,
          XRplayer.position.z,
        ]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.75, 0.5]} />
      </RigidBody>
    </>
  );
}

export default Player;
