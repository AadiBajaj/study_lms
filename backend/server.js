const express = require('express')
const app = express();
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');

const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const paymentRoutes = require('./routes/payments');
const courseRoutes = require('./routes/course');


app.use(express.json()); 
app.use(cookieParser());
app.use(
    cors({
        // origin: 'http://localhost:5173',
        origin: "*",
        credentials: true
    })
);
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp'
    })
)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});

connectDB();
cloudinaryConnect();

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/course', courseRoutes);


app.get('/', (req, res) => {
    res.send(`<div>
    This is Default Route  
    </div>`);
})