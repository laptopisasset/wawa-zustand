import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Experience } from "./components/Experience";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import {
  KeyboardControls,
  Loader,
  useFont,
  useProgress,
} from "@react-three/drei";
import { useMemo } from "react";
import { Controls } from "./constants";
import { Menu } from "./components/Menu";
import { Leva } from "leva";

function App() {
  useFont.preload("./fonts/Noto Sans JP ExtraBold_Regular.json");
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  const { progress } = useProgress();
  return (
    <KeyboardControls map={map}>
      <Leva hidden />
      <Canvas shadows camera={{ position: [0, 20, 14], fov: 42 }}>
        <color attach="background" args={["#e3daf7"]} />
        <Suspense>
          <Physics>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
      <Loader />
      {progress === 100 && <Menu />}
      <Menu />
    </KeyboardControls>
  );
}

export default App;
