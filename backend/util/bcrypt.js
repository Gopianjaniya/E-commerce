import bcrypt from "bcrypt";

const saltRound = 10;

const bcryptPassword = async (password) => {
  return await bcrypt.hash(password, saltRound);
 
};

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

export { bcryptPassword, comparePassword }; 
