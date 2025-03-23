const mongoose = require('mongoose');

const MONGO_URI: string = process.env.MONGO_URI || 'abc';

const connection = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("Mongo Connected Successfully on:", MONGO_URI);
    }catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
}

export default connection;