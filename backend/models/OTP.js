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
        expires: 5 * 60, // 5 minutes
    }
});

async function sendVerificationEmail(email, otp) {
    try {
        await mailSender(email, 'Verification Email from SkillNest', `Your OTP is: ${otp}`);
        console.log('Email sent successfully to -', email);
    } catch (error) {
        console.error('Error while sending an email to', email, error);
        throw error;
    }
}

OTPSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            await sendVerificationEmail(this.email, this.otp);
        }
        next();
    } catch (error) {
        next(error); 
    }
});

module.exports = mongoose.model('OTP', OTPSchema);
