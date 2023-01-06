use actix_web::{post, web, Responder, HttpResponse};
use super::models::{Grid};

#[post("/api/solve")]
async fn solve_puzzle(data: web::Json<Grid>) -> impl Responder {
  let d = &data.data;
  let mut grid: Grid = Grid::new(9, 9);
  
  for y in 0..d.len() {
    for x in 0..d[y].len() {
      grid.data[y].push(d[y][x]);
    }
  }
  
  grid.solve(0, 0);
  
  // println!("{:#?}", grid);

  HttpResponse::Ok().json(grid.data)
}

pub fn config(cfg: &mut web::ServiceConfig) {
  cfg.service(solve_puzzle);
}