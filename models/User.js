const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
        
    },

    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
});


//salt and hash pass
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//login function

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if(user){

        const auth = await bcrypt.compare(password, user.password);
        if(auth){
          return user
        }
        throw Error('Wrong Password')
    }
    throw Error('Incorrect Email')
}



const User = mongoose.model('user', userSchema);
module.exports = User; 