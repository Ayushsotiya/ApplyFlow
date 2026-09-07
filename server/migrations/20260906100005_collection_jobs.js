exports.up = (pgm) => {
    pgm.sql(`
        CREATE TABLE collection_jobs(
              collection_id INTEGER NOT NULL,
              job_id INTEGER NOT NULL,
              

              PRIMARY KEY (collection_id, job_id),
              
              FOREIGN KEY (collection_id)
                REFERENCES collections(id)
                ON DELETE CASCADE,
            
              FOREIGN KEY (job_id)
                REFERENCES jobs(id)
                ON DELETE CASCADE
        );
    `);
}

exports.down = (pgm) => {
    pgm.sql(`
        DROP TABLE collection_jobs;
    `)
}