const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const Budget = require('./Budget');
const Expense = require('./Expense');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Not a valid address!'],
    },
    password: {
        type: String,
        required: true,
        // validator?
        minLength: 6,
    },
    budgets: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Budget'
              }],
              
    expenses: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Expense' 
               }],

});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next()
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;