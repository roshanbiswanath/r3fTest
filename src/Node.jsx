import React, { useEffect, useRef } from 'react'
import { useBox, useConvexPolyhedron } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'

function Node(props) {

    // const [ref, api] = useBox(() => ({
    //     mass: 0,
    //     material: {
    //         friction: 1,
    //         restitution: 0
    //     },
    //     type: "static",
    //     position: [node.position.x, node.position.y, node.position.z],
    //     rotation: [node.rotation.x, node.rotation.y, node.rotation.z],
    // }), useRef(null))
    // useFrame(() => {
    //     console.log(ref)
    // })
    const { node } = props
    // console.log(node)
    // console.log(node.position)
    // useEffect(() => {
    //     console.log(node.position)
    //     ref.current.position.set(node.position)
    // })
    // useEffect(() => {
    //     api.position.set(node.position)
    // }, [node])
    return (
        <>
            {/* {console.log(node.position)} */}
            {/* <mesh ref={ref} geometry={node.geometry} /> */}
            <primitive object={node} position={node.position} ></primitive>
        </>
    )
}

export default Node
