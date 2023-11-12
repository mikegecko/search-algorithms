import { useState } from "react";
import { Box, Divider, Heading, Button } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import { Grid } from "./algorithms/grid";
import { astar } from "./algorithms/astar";

function App() {
  const [gridValues, setGridValues] = useState([
    0, 0, 0, 0, 0, 
    0, 1, 0, 0, 0, 
    0, 0, 0, 0, 0, 
    0, 1, 0, 1, 0, 
    0, 0, 0, 1, 0,
  ]);
  const [path, setPath] = useState([]);
  const start = { x: 0, y: 0 };
  const end = { x: 4, y: 4 };
  const grid = new Grid(5, 5, gridValues);

  const onSimulate = (e) => {
    const path = astar(grid, start, end);
    console.log(path);
    setPath(path);
  };

  const onReset = (e) => {
    setPath([]);
  }
  const generateMeshs = () => {
    return grid.grid.map((row, rowIndex) => {
      return row.map((value, colIndex) => {
        const isStart = start.x === colIndex && start.y === rowIndex;
        const isEnd = end.x === colIndex && end.y === rowIndex;
        const isPath = path.some((p) => p.x === colIndex && p.y === rowIndex);
        return (
          <mesh
            key={`${rowIndex}-${colIndex}`}
            position={[colIndex - 2, 0, rowIndex - 2]}
          >
            <boxGeometry />
            <meshBasicMaterial
              color={isStart ? "green" : isPath ? "blue" : isEnd ? "red" : value === 1 ? "black" : "white"}
              wireframe={false}
            />
          </mesh>
        );
      });
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDir: "column",
        minH: "100vh",
        minW: "100vw",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        id="header-container"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "10%",
        }}
      >
        <Heading>Search Algorithms</Heading>
      </Box>
      <Divider />
      <Box
        id="content-container"
        sx={{ height: "100%", width: "100%", display: "flex" }}
      >
        <Box
          id="view-container"
          sx={{
            flex: 1,
            border: "1px solid gray",
            display: "flex",
            borderRadius: "1rem",
            margin: "2rem",
          }}
        >
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight color="white" position={[0, 0, 5]} />
            <gridHelper args={[5, 5]} />
            <PerspectiveCamera position={[0, 10, 0]} makeDefault />
            <CameraControls />
            {generateMeshs()}
          </Canvas>
        </Box>
        <Divider orientation="vertical" />
        <Box
          id="control-container"
          sx={{
            minWidth: "250px",
            maxWidth: "350px",
            display: "flex",
            flexDir: "column",
            padding: "1rem",
            gap: "1rem",
          }}
        >
          <Heading sx={{ fontSize: "1.5em", textAlign: "center" }}>
            Controls
          </Heading>
          <Button onClick={onSimulate}>Simulate</Button>
          <Button onClick={onReset}>Reset</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
