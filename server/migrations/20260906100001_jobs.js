exports.up = (pgm) => {
    pgm.sql(`
        CREATE TABLE jobs (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            company_name VARCHAR(150) NOT NULL,
            job_title VARCHAR(150) NOT NULL,
            description TEXT,
            status VARCHAR(50) DEFAULT 'Applied',
            note TEXT,
            salary VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (user_id)
                REFERENCES users(id)
                ON DELETE CASCADE
        );
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DROP TABLE jobs;
    `);
};
