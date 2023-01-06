use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Grid {
  pub data: Vec<Vec<u16>>
}


impl Grid {
  pub fn new(width: usize, height: usize) -> Self {
      let mut array: Vec<Vec<u16>> = Vec::with_capacity(height);
      for _ in 0..height {
          array.push([].repeat(width * height));
      }

      Self {
          data: array
      }
  }

  fn is_valid(&self, y: usize, x: usize, n: usize) -> bool {
      for i in 0..9 {
          if self.data[y][i] == n as u16 {
              return false;
          }
      }
  
      for i in 0..9 {
          if self.data[i][x] == n as u16 {
              return false;
          }
      }
  
      let _x: usize = (x / 3) * 3;
      let _y: usize = (y / 3) * 3;
      for i in 0..3 {
          for j in 0..3 {
              if self.data[_y + i][_x + j] == n as u16{
                  return false;
              }
          }
      }
  
      true
  }

  pub fn solve(&mut self, y: usize, x: usize) -> bool {
      
      if y == 9 {
          return true;
      } else if x == 9 {
          return self.solve(y + 1, 0);
      } else if self.data[y][x] != 0 {
          return self.solve(y, x + 1);
      } else {
          for n in 1..10 {
              if self.is_valid(y, x, n) {
                  self.data[y][x] = n as u16;
                  if self.solve(y, x + 1) {
                      return true;
                  }
                  self.data[y][x] = 0;
              }
          }
      }

      false
  }
}
