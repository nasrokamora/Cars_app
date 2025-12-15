use tantivy::{Index, doc};
use crate:: schema::CarSchema;
use serde::Deserialize;



#[derive(Deserialize, Debug)]
pub struct CarInput {
    pub id: String,
}