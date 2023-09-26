const User = require('../model/userModel');
const bcrypt = require('bcrypt'); // bcrypt is used for encryption of password

// register
module.exports.register = async (req, res, next) => {
try{
 const { username, email, password } = req.body;
 const usernameCheck = await User.findOne({ username });
 if (usernameCheck) return res.json({ msg: "Username already used", status: false });
 const emailCheck = await User.findOne({email});
 if (emailCheck) return res.json({ msg: "Email already used", status: false });
 const hashedPassword = await bcrypt.hash(password,10);
 const user = User.create({
  email,
  username,
  password:hashedPassword
 });
 delete user.password;
 return res.json({status: true});
}catch(ex){
 next(ex);
}
};

//login
module.exports.login = async (req, res, next) => {
 try{
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.json({ msg: "Incorrect Username", status: false });
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.json({ msg: "Password is not valid", status: false });
  delete user.password;
  return res.json({status: true, user});
 }catch(ex){
  next(ex);
 }
 };
 
 //setAvatar 
 module.exports.setAvatar = async (req, res, next) => {
  try{
  const userId = req.params.id;
  const avatarImage = req.body.image;
  const userData = await User.findByIdAndUpdate(userId,{
   isAvatarImageSet:true,
   avatarImage
  });
  return res.json({
  isSet: userData.isAvatarImageSet,
  image: userData.avatarImage
  });
  }catch(ex){
   next(ex);
  }
 };
 
 //allUsers
 module.exports.getAllUsers = async (req, res, next) => {
 try{
  const users  = await User.find({ _id: {$ne: req.params.id}}).select([
  "email",
  "username",
  "avatarImage",
  "_id"
  ]);
  console.log(users);
  return res.json(users);
 }catch(ex){
  next(ex);
 }
 };
 
 // always use try, catch. if you will not use it then at server side there may be unexpected error and server might cast.
