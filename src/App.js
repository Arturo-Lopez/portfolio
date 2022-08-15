import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Linkedin, FileText } from 'react-feather'

// This sandbox shows how to prgressively load an asset through nested suspense blocks
// 1. A generic fallback
// 2. Lesser resolution
// 3. High resolution

export default function App() {
  return (
    <Suspense fallback={<span>loading...</span>}>
      <h1>Arturo Lopez</h1>
      <Canvas dpr={[1, 2]} camera={{ position: [-2, 2, 4], fov: 25 }}>
        <directionalLight position={[10, 10, 0]} intensity={1.5} />
        <directionalLight position={[-10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, 20, 0]} intensity={1.5} />
        <directionalLight position={[0, -10, 0]} intensity={0.25} />
        <Rotate position-y={-0.5} scale={0.2}>
          <Suspense fallback={<Model url="/bust-lo-draco.glb" />}>
            <Model url="/bust-hi.glb" />
          </Suspense>
        </Rotate>
      </Canvas>

      <div className="content">
        <h2>Hello, I'm Arturo</h2>
        <p>I’m a software developer. I love web technologies and I always seek new challenges.</p>

        <div className="links">
          <a href="https://www.linkedin.com/in/artur-lopez/" target="_blank" rel="noreferrer">
            <button>
              <Linkedin size={20} /> Linkedin
            </button>
          </a>
          <a href="/ArturoLopezCV.pdf" target="_blank" rel="noreferrer">
            <button>
              <FileText size={20} /> Download CV
            </button>
          </a>
        </div>
      </div>
    </Suspense>
  )
}

function Model({ url, ...props }) {
  // useGLTF suspends the component, it literally stops processing
  const { scene } = useGLTF(url)
  // By the time we're here the model is gueranteed to be available
  return <primitive object={scene} {...props} />
}

function Rotate(props) {
  const ref = useRef()
  useFrame((state) => (ref.current.rotation.y = state.clock.elapsedTime))
  return <group ref={ref} {...props} />
}
