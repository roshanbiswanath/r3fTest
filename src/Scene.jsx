import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html, useProgress } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import Node from "./Node";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}
function Scene() {
  const { scene, nodes } = useLoader(GLTFLoader, "dhauli.glb");
  // const bounds = useMemo(() => {
  //   const boxes = Object.entries(nodes).map(([key, node]) => {
  //     if (!node || !node.geometry) {
  //       return null
  //     }
  //     node.geometry.computeBoundingBox()
  //     return node.geometry.boundingBox
  //   })
  //   return boxes
  // }, [nodes])

  // let refsApi = {}

  // Object.keys(nodes).map(f => function () { refsApi[f] = useBox(() => ({ mass: 0 })) })
  // Object.keys(nodes).map((node) => {
  //   const [ref, api] = useBox(() => ({ mass: 0 }))
  //   refsApi[node] = { "ref": ref, "api": api }
  // })
  // console.log(refsApi)
  // const [ref, api] = useBox(() => ({ mass: 0 }))
  // console.log(nodes)
  // console.log(useThree())
  // Object.keys(scene.children).map((f, index) => console.log(scene.children[f].position))
  return (
    <>
      {/* // <Suspense fallback={Loader()}> */}
      {/* <primitive object={scene} position={[-350, 0, 100]} /> */}
      {/* <primitive object={scene} position={[-350, 0, 100]} /> */}

      {/* {Object.keys(scene.children).map((f) => (
        <primitive object={scene.children[f]} />
      ))} */}
      {/* {Object.keys(nodes).map((f, index) => <Node key={index} node={nodes[f]} />)} */}
      {Object.keys(scene.children).map((f, index) => (
        <RigidBody colliders="hull" key={index} type="fixed">
          <Node key={index} node={scene.children[f]} />
        </RigidBody>
      ))}

      {/* // </Suspense> */}
    </>
  );
}

export default Scene;
