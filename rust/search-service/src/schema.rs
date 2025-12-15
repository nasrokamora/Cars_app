use tantivy::schema::*;

pub fn CarSchema {
    pub schema: Schema,
    pub id: Field,
    pub title: Field,
    pub description: Field,
    pub brand: Field,
    pub model: Field,
    pub price: Field,
    pub year: Field,
    pub mileage: Field,
}


imp CarSchema {
    pub fn new() -> Self {
        let mut builder = Schema::bulder();

        let id = builder.add_text_field("id", STORED);
        let title = builder.add_text_field("title", TEXT | STORED);
        let brand = builder.add_text_field("brand", TEXT | STORED);
        let model = builder.add_text_field("model", TEXT | STORED);
        let price = builder.add_i64_field("price", TEXT | STORED);
        let year = builder.add_i64_field("year", TEXT | STORED);
        let mileage = builder.add_i64_field("mileage", TEXT | STORED);

        let schema = builder.build();


        self {
            schema,
            id,
            title,
            brand,
            model,
            price,
            year,
            mileage,
        }
    }
}