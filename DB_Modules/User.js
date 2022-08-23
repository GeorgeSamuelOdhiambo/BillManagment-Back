const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userschema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken:{type: String},
    bills: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Bills' }
      ]
},{
    timestamps: true
});

module.exports = mongoose.model('Users',userschema);