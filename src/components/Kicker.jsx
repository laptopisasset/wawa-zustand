import React, { useRef } from "react";

import { useGameStore } from "../store";
import { gameStates } from "../constants";
import { RigidBody, quat } from "@react-three/rapier";
import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

export const Kicker = () => {
  const kicker = useRef();
  const { gameState, currentStage } = useGameStore((state) => ({
    gameState: state.gameState,
    currentStage: state.currentStage,
  }));

  useFrame((_state, delta) => {
    if (!kicker.current) {
      return;
    }
    const curRotation = quat(kicker.current.rotation());
    const incrementRotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      delta * 8
    );
    curRotation.multiply(incrementRotation);
    kicker.current.setNextKinematicRotation(curRotation);
  });

  if (gameState !== gameStates.GAME || currentStage < 2) {
    return null;
  }

  return (
    <RigidBody type="kinematicPosition" position={[0, 0.1, 0]} ref={kicker}>
      <group position={[3, 0, 0]}>
        <Box args={[1.5, 0.2, 0.2]}>
          <meshStandardMaterial color="mediumpurple" />
        </Box>
      </group>
    </RigidBody>
  );
};
