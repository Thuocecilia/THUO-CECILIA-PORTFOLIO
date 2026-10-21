
import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import type { Group } from 'three'

type FoxModelProps = {
  running: boolean
}

export default function FoxModel({ running }: FoxModelProps) {
  const group = useRef<Group>(null)

  const { scene, animations } = useGLTF('/models/Fox.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const nextAction = actions[running ? 'Run' : 'Walk']
    const previousAction = actions[running ? 'Walk' : 'Run']

    if (!nextAction) {
      console.warn(
        `Fox animation "${running ? 'Run' : 'Walk'}" was not found.`,
        Object.keys(actions),
      )
      return
    }

    previousAction?.fadeOut(0.2)

    nextAction.reset()
    nextAction.setEffectiveTimeScale(running ? 1.4 : 0.8)
    nextAction.setEffectiveWeight(1)
    nextAction.fadeIn(0.2)
    nextAction.play()

    return () => {
      nextAction.fadeOut(0.2)
    }
  }, [actions, running])

  return (
    <group ref={group} position={[0, -0.65, 0]} rotation={[0, -0.4, 0]}>
      <primitive
        object={scene}
        scale={0.02}
        dispose={null}
      />
    </group>
  )
}

useGLTF.preload('/models/Fox.glb')
