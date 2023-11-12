
class Grid {
    constructor(rows, cols, values) {
      if (values.length !== rows * cols) {
        throw new Error('Invalid grid values.');
      }
  
      this.rows = rows;
      this.cols = cols;
      this.grid = [];
  
      for (let i = 0; i < rows; i++) {
        this.grid[i] = [];
        for (let j = 0; j < cols; j++) {
          this.grid[i][j] = values[i * cols + j];
        }
      }
    }
  
    isWithinBounds(x, y) {
      return x >= 0 && x < this.rows && y >= 0 && y < this.cols;
    }
  
    isWalkable(x, y) {
      return this.isWithinBounds(x, y) && this.grid[x][y] === 0;
    }
  
    setWalkable(x, y, walkable) {
      if (this.isWithinBounds(x, y)) {
        this.grid[x][y] = walkable ? 0 : 1;
      }
    }
  
    print() {
      for (let i = 0; i < this.rows; i++) {
        console.log(this.grid[i].join(' '));
      }
    }
  }
  