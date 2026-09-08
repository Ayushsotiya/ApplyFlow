exports.up = (pgm) => {
    pgm.sql(`
            CREATE TABLE jobs (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,

                company_name VARCHAR(150) NOT NULL,
                job_title VARCHAR(150) NOT NULL,
                description TEXT,

                job_url TEXT,
                location VARCHAR(150),
                salary VARCHAR(100),

                status VARCHAR(50) DEFAULT 'Applied',
                priority VARCHAR(30) DEFAULT 'Normal',

                note TEXT,

                applied_date DATE DEFAULT CURRENT_DATE,

                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

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