const Client = require("../models/Client");

exports.newClient = async (req, res, next) => {
  const client = new Client(req.body);
  try {
    await client.save();
    res.json({ msg: "Se agrego un nuevo cliente" });
  } catch (error) {
    res.json({ msg: "Ese correo ya esta registrado" }, 403);
    next();
  }
};

exports.getClients = async (req, res, next) => {
  try {
    const clients = await Client.find({});
    res.json({ data: clients });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.getClient = async (req, res, next) => {
  const client = await Client.findById(req.params.id);
  if (!client) {
    res.json({ msg: "Ese cliente no existe" }, 404);
    return next();
  }
  res.json({ data: client }, 200);
};

exports.updateClient = async (req, res, next) => {
  console.log("Body: ", req.body);
  try {
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.json({ data: client }, 200);
  } catch (error) {
    res.json({ msn: "Valio Cabeza" }, 404);
    next();
  }
};

exports.deleteClient = async (req, res, next) => {
  try {
    await Client.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: "El cliente se ha eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};
