const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60, // Expires in 5 minutes
    }
});

// Function to send email
async function sendVerificationEmail(email, otp) {
    try {
        await mailSender(email, 'Verification Email from StudyNotion', `Your OTP is: ${otp}`);
        console.log('Email sent successfully to -', email);
    } catch (error) {
        console.error('Error while sending an email to', email, error);
        throw error;
    }
}

// Pre-save middleware (using function instead of arrow function)
OTPSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            await sendVerificationEmail(this.email, this.otp);
        }
        next();
    } catch (error) {
        next(error); // Pass error to Mongoose
    }
});

module.exports = mongoose.model('OTP', OTPSchema);
