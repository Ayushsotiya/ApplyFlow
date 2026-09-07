exports.up = (pgm) => {
    pgm.sql(`
        CREATE TABLE collections (
            id SERIAL PRIMARY KEY,

            user_id INTEGER NOT NULL,

            name VARCHAR(100) NOT NULL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (user_id)
                REFERENCES users(id)
                ON DELETE CASCADE,

            UNIQUE(user_id,name)
        );
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DROP TABLE collections;
    `);
};