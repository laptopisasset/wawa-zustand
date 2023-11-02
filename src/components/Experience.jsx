import {
  Cylinder,
  MeshReflectorMaterial,
  OrbitControls,
  Text3D,
} from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { Torii } from "./Torii";
import { kanas } from "../constants";
import { useGameStore } from "../store";
import { useEffect } from "react";
import { Kanaspots } from "./Kanaspots";
import { CharacterController } from "./CharacterController";

export function Experience() {
  const startGame = useGameStore((state) => state.startGame);
  const { level, currentKana } = useGameStore((state) => ({
    level: state.level,
    currentKana: state.currentKana,
  }));

  useEffect(() => {
    startGame();
  }, []);

  return (
    <>
      <OrbitControls />
      {/* LIGHTS */}
      <ambientLight intensity={1} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.0}
        castShadow
        color="#9e69da"
      />

      {/* BACKGROUND */}

      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[400, 400]}
          resolution={1024}
          mixBlur={1}
          mixStrength={15}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#dbecfb"
          metalness={0.6}
          roughness={1}
        />
      </mesh>

      <Torii
        scale={[16, 16, 16]}
        position={[0, 0, -22]}
        rotation-y={1.25 * Math.PI}
      />
      <Torii
        scale={[10, 10, 10]}
        position={[-8, 0, -20]}
        rotation-y={1.4 * Math.PI}
      />
      <Torii scale={[10, 10, 10]} position={[8, 0, -20]} rotation-y={Math.PI} />
      <group position-y={-1}>
        {/* STAGE */}
        <RigidBody
          colliders={false}
          type="fixed"
          position-y={-0.5}
          friction={2}
        >
          <CylinderCollider args={[1 / 2, 5]} />
          <Cylinder scale={[5, 1, 5]} receiveShadow>
            <meshStandardMaterial color="white" />
          </Cylinder>
        </RigidBody>

        {/* CHARACTER */}
        <CharacterController />

        {/* KANA */}
        <Kanaspots />
      </group>
    </>
  );
}
