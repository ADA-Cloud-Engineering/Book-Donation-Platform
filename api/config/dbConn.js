const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,

        });
    } catch (err) {
        console.error(err);
    }
}

//middleware
app.use(express.json());
module.exports = connectDB