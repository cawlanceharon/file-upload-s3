
const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
require('dotenv').config(); // Load environment variables

const app = express();

// File routes
app.use('/api/files', fileRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
            