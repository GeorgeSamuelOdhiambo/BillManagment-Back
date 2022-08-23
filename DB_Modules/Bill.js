const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billschema = new Schema({
    billName: {
        type: String,
        required: true
    },
    billAmount: {
        type: Number,
        required: true
    },
    billPaymentDate: {
        type: Date,
        required: true
    },
    billDuration: {
        type: Number,
        required: true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users' 
      }
},{
    timestamps: true
});

module.exports = mongoose.model('Bills',billschema);