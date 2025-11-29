use clap::Parser;

#[derive(Parser)]
struct Args {
   #[arg(long)]
   seed: Option<usize>,
}

fn main() {
   let args = Args::parse();
   if let Some(n) = args.seed {
       // generate `n` sample cars as JSON and print
   } else {
       println!("Hello, Cars_app Rust helper");
   }
}
