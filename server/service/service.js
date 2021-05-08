const SequelizeDB = require("./models");

// Functions
const GetAllApplicationTemplates = async () => {
  const templates = await SequelizeDB.ApplicationTemplate.findAll();
  return JSON.parse(JSON.stringify(templates));
};

const CreateApplicationTemplate = async (input) => {
  const template = await SequelizeDB.ApplicationTemplate.create({
    name: input.name,
    description: input.description,
  });
  return template.get();
};

const Login = async (input) => {
  const login = await SequelizeDB.Login.findAll({
    where: {
      login: input.login,
      password: input.password,
    },
  });
  return login[0].get();
};

const GetUserById = async (id) => {
  const user = await SequelizeDB.User.findAll({
    where: {
      id: id,
    },
  });
  return user[0].get();
};

const ChangeUser = async (userChange) => {
  const userChangeFinal = await SequelizeDB.User.update(
    {
      firstName: userChange.firstName,
      lastName: userChange.lastName,
      middleName: userChange.middleName,
      email: userChange.email,
      phone: userChange.phone,
    },
    {
      returning: true,

      where: {
        id: userChange.id,
      },
    }
  );
  return JSON.parse(JSON.stringify(userChangeFinal));
};

// Exports
module.exports.GetAllApplicationTemplates = GetAllApplicationTemplates;
module.exports.CreateApplicationTemplate = CreateApplicationTemplate;
module.exports.Login = Login;
module.exports.GetUserById = GetUserById;
module.exports.ChangeUser = ChangeUser;
