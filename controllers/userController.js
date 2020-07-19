const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const user = new User(req.body);
  user.password = await bcrypt.hash(req.body.password, 12);
  try {
    await user.save();
    res.json({ msn: "Usuario creado con exito" });
  } catch (error) {
    console.log("error signUp: ", error);
    res.json({ msn: "Hubo un error" }, 500);
  }
};

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    await res.status(401).json({ msn: "Ese usuario no existe" });
    next();
  } else {
    if (!bcrypt.compareSync(password, user.password)) {
      await res.status(401).json({ msn: "Password Incorrecto" });
      next();
    } else {
      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
          _id: user._id,
        },
        "llavesecreta",
        {}
      );
      res.json({ token });
    }
  }
};
