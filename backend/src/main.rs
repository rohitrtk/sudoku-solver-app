use actix_web::{get, App, HttpServer, Responder, HttpResponse};
use actix_cors::Cors;

mod solver;
use solver::services;

#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body("This is a health chceck.")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let localhost: &str = "127.0.0.1";
    let port: u16 = 8080;

    let running = HttpServer::new(move || {
        // Yes, I know how bad this is.
        let cors = Cors::default()
        .allow_any_origin()
        .allow_any_header()
        .allow_any_method();

        App::new()
            .service(index)
            .configure(services::config)
            .wrap(cors)
    }).bind((localhost, port)).unwrap().run();

    println!("Server is running at {}:{}", localhost, port);

    running.await
}
