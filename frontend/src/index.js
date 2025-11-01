// !!! IMPORTANT ARCHITECTURAL NOTE: THIS FILE IS FOR YOUR SECURE NODE.JS BACKEND SERVER !!!
// The original error ("require is not defined") occurred because you tried to run this Node.js-specific code 
// in a browser/React context, which is also a major security risk. 
// We are switching to 'import/export' syntax so the file can be compiled, but it must still be run on the backend.

// 1. Import Mongoose (using ES Module syntax)
import mongoose from 'mongoose'; 

// 2. IMPORTANT: In a real backend, you would securely load your connection string 
// from environment variables (e.g., in a .env file). 
// Here, we define a placeholder constant for demonstration.
const MONGODB_URI = ''; 

// 3. Define the connection function
const connectDB = async () => {
    if (!MONGODB_URI) {
        console.error('FATAL ERROR: MONGODB_URI is missing. Set this securely on your backend server.');
        // In a real server, you would use process.exit(1) here.
        return; 
    }
    
    try {
        console.log('Attempting to connect to MongoDB Atlas...');
        
        // Use mongoose.connect() to establish the connection
        await mongoose.connect(MONGODB_URI);

        console.log('✅ MongoDB Atlas connection successful!');

    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        // In a real server, you would use process.exit(1) here.
    }
};

// 4. Export the function (using ES Module syntax)
export default connectDB;

// Example Usage in your main server file (e.g., index.js):
// import connectDB from './path/to/this/file';
// connectDB();
// import express from 'express';
// const app = express();
// app.listen(3001, () => console.log('Server running on port 3001'));
