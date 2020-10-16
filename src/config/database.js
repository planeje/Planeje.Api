module.exports = {
    dialect: 'postgres',
    host: 'ec2-34-197-141-7.compute-1.amazonaws.com',
    port: '5432',
    username: 'lphhwxifkkelbx',
    password:'f6f9b507c97e9d1a3c02e8e38b1cb987137958ad8ed603c7f14f0194fbb6afab',
    database: 'd62ihk396ssu2s',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
        timestamps: true,
    }
}
