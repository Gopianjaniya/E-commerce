import jwt from "jsonwebtoken";

// ----------- function for createToken
export const createToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET_KEY);
};

// ----------- function for Varify-Token
export const verifyToken = async (req, res, next) => {
  try {
    const { token } = req?.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    //  Decode-Token

    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (
      token_decode.data !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
