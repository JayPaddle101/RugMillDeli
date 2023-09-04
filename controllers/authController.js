const User = require("../models/User");
const jwt = require('jsonwebtoken');

//Error Handling 
const handleErrors = (err) =>{

  //console.log(err.message + err.code);

  let error = {
    email: '',
    password: ''
  }

  // incorrect email
  if (err.message === 'Incorrect Email') {
    error.email = 'That email is not registered';
  }
  
  // incorrect password
  if (err.message === 'Wrong Password') {
    error.password = 'That password is incorrect';
  }

  //duplicate User
  if(err.code === 11000){
    error.email = "That email is already registered";
    return error;
  }

  //validation errors
  if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    })
  }
   
  return error;
}


//Create JWT Token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) =>{
  return jwt.sign({ id }, 'jaypaddle', {
    expiresIn: maxAge   
  })
}



// controller actions 
module.exports.signup_get = (req, res) =>{
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
   const { email, password } = req.body;
   console.log(' Signup Received message from client:', { email, password });
   
   try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json({user: user._id})
   } 
   catch (err) {
    const error = handleErrors(err)
    res.status(400).json({ error })
   }
   
}


module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log('Log In Received message from client:', { email, password });
  
  try {
   
   const user = await User.login(email, password);
   const token = createToken(user._id);
   res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
   res.status(201).json({user: user._id})
  } 
  catch (err) {
   const error = handleErrors(err)
   res.status(400).json({ error })
  }
  
}

module.exports.logout_get = (req, res) =>{
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/');
}




  