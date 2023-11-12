class Node {
    constructor(x, y, cost, heuristic) {
      this.x = x;
      this.y = y;
      this.cost = cost;
      this.heuristic = heuristic;
      this.totalCost = cost + heuristic;
      this.parent = null;
    }
  }
  
  function astar(grid, start, end) {
    const openSet = [];
    const closedSet = [];
  
    openSet.push(new Node(start.x, start.y, 0, heuristic(start, end)));
  
    while (openSet.length > 0) {
      // Find the node with the lowest total cost in the open set
      let current = openSet[0];
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].totalCost < current.totalCost) {
          current = openSet[i];
        }
      }
  
      // Move the current node from the open set to the closed set
      openSet.splice(openSet.indexOf(current), 1);
      closedSet.push(current);
  
      // Check if we have reached the goal
      if (current.x === end.x && current.y === end.y) {
        // Reconstruct the path
        const path = [];
        while (current.parent) {
          path.push({ x: current.x, y: current.y });
          current = current.parent;
        }
        return path.reverse();
      }
  
      // Generate neighbors
      const neighbors = [];
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const nx = current.x + dx;
          const ny = current.y + dy;
  
          // Check if the neighbor is a valid move (not a wall)
          if (!grid.isWalkable(nx, ny)) continue;
  
          // Calculate the cost to reach this neighbor
          const cost = current.cost + 1;
  
          // Check if the neighbor is already in the closed set with a lower cost
          const inClosedSet = closedSet.find((node) => node.x === nx && node.y === ny);
          if (inClosedSet && cost >= inClosedSet.cost) continue;
  
          // Check if the neighbor is already in the open set with a lower cost
          const inOpenSet = openSet.find((node) => node.x === nx && node.y === ny);
          if (inOpenSet && cost >= inOpenSet.cost) continue;
  
          // Add the neighbor to the open set
          const neighbor = new Node(nx, ny, cost, heuristic({ x: nx, y: ny }, end));
          neighbor.parent = current;
          openSet.push(neighbor);
        }
      }
    }
  
    // If open set is empty and goal is not reached, there is no path
    return null;
  }
  
  function heuristic(a, b) {
    // Manhattan distance as a heuristic
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }