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
  const user = await SequelizeDB.User.findOne({
    where: {
      id: id,
    },
    include: {
      all: true,
    },
  });
  console.log(JSON.parse(JSON.stringify(user)));
  return JSON.parse(JSON.stringify(user));
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

const CreateApplication = async (application) => {
  const applicationName = await SequelizeDB.Application.create({
    name: application.name,
    description: application.description,
    userId: application.userId,
  });
  return applicationName.get();
};

const CreateApplicationStatus = async (applicationStatus) => {
  const applicationStatusName = await SequelizeDB.ApplicationStatus.create({
    date: Date.parse(applicationStatus.date),
    applicationId: applicationStatus.applicationId,
    statusId: applicationStatus.statusId ? applicationStatus.statusId : 1,
  });
  return JSON.parse(JSON.stringify(applicationStatusName.get()));
};

// Exports
module.exports.GetAllApplicationTemplates = GetAllApplicationTemplates;
module.exports.CreateApplicationTemplate = CreateApplicationTemplate;
module.exports.Login = Login;
module.exports.GetUserById = GetUserById;
module.exports.ChangeUser = ChangeUser;
module.exports.CreateApplication = CreateApplication;
module.exports.CreateApplicationStatus = CreateApplicationStatus;
