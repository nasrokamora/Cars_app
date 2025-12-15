use tantivy::{Index, doc};
use crate:: schema::CarSchema;
use serde::Deserialize;



#[derive(Deserialize, Debug)]
pub struct CarInput {
    pub id: String,
    pub title: String,
    pub description: String,
    pub brand: String,
    pub model: String,
    pub price: u64,
    pub year: u64,
    pub mileage: u64
}

pub fn index_car(index: &Index,schema: &CarSchema ,car: CarInput) {
    let mut writer = index.writer(50_000_000).unwrap();


    writer.add_document(doc!(
        schema.id => car.id,
        schema.title => car.title,
        schema.description => car.description,
        schema.brand => car.brand,
        schema.model => car.model,
        schema.price => car.price,
        schema.year => car.year,
        schema.mileage => car.mileage
    ))
    writer.commit().unwrap();
}
