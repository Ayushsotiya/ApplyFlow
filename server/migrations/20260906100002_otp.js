
exports.up = (pgm) => {
    pgm.createTable("otp", {
        id: {
            type: "serial",
            primaryKey: true,
        },

        email: {
            type: "varchar(255)",
            notNull: true,
        },

        otp: {
            type: "varchar(6)",
            notNull: true,
        },

        created_at: {
            type: "timestamp",
            default: pgm.func("current_timestamp"),
            notNull: true,
        },
        expires_at: { 
            type: "timestamp", 
            default: pgm.func("current_timestamp + interval '10 minutes'"), 
            notNull: true, 
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("otp");
};

