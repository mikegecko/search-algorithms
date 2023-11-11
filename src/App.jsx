import { useState } from "react";
import { Box, Divider, Heading } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { CameraControls, PerspectiveCamera } from "@react-three/drei";

function App() {
  return (
    <Box sx={{ display: "flex", flexDir: "column", minH:'100vh', minW: '100vw', height: '100vh', width: '100vw' }}>
      <Box id="header-container" sx={{display: 'flex', justifyContent: 'center', alignItems:'center', minHeight: '10%'}}>
        <Heading>Search Algorithms</Heading>
      </Box>
      <Divider />
      <Box id="content-container" sx={{ height:'100%', width: '100%', display: 'flex'}}>
        <Box id="view-container" sx={{ flex: 1, border: '1px solid red', display: 'flex', borderRadius: '1rem', margin: '2rem'}}>
          <Canvas>
            <mesh>
              <boxGeometry />
              <meshStandardMaterial />
              <PerspectiveCamera position={[0, 0, 10]} makeDefault />
              <CameraControls />
            </mesh>
          </Canvas>
        </Box>
        <Divider orientation="vertical" />
        <Box id="control-container" sx={{minWidth: '250px', maxWidth: '350px'}}>
          <Heading sx={{fontSize: '1.5em', textAlign: 'center'}}>Controls</Heading>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
