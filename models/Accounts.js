var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
    source: mongoose.Schema.Types.ObjectId,
    destination: mongoose.Schema.Types.ObjectId,
    value: Number,
    state: String,
    lastModified: Date
});

var GoalSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    current: Number
});

var AccountSchema = new mongoose.Schema({
    name: String,
    balance: {
        type: Number,
        default: 0
    },
    pendingTransactions: [TransactionSchema],
    goals: [GoalSchema]
});

mongoose.model('Account', AccountSchema);
