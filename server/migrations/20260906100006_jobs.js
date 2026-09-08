exports.up = (pgm) => {
    pgm.sql(`
        ALTER TABLE jobs
        ADD COLUMN job_type VARCHAR(30) DEFAULT 'Onsite';
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        ALTER TABLE jobs
        DROP COLUMN job_type;
    `);
};