const SequelizeDB = require("./models");
const { Op } = require("sequelize");

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

const GetAllApplications = async (applications) => {
  const applicationList = await SequelizeDB.ApplicationStatus.findAll({
    include: [
      {
        model: SequelizeDB.Application,
        where: {
          userId: applications,
        },
      },
      {
        model: SequelizeDB.Status,
      },
    ],
  });
  console.log(applicationList);
  return JSON.parse(JSON.stringify(applicationList));
};

const DeleteApplication = async (id) => {
  await SequelizeDB.Application.destroy({
    where: {
      id: id,
    },
  });
  return true;
};

const GetAllRoles = async () => {
  const roles = await SequelizeDB.Role.findAll();
  return JSON.parse(JSON.stringify(roles));
};

const GetAllGender = async () => {
  const genders = await SequelizeDB.Gender.findAll();
  return JSON.parse(JSON.stringify(genders));
};

const GetAllDepartment = async () => {
  const departments = await SequelizeDB.Department.findAll();
  return JSON.parse(JSON.stringify(departments));
};

const CreateLogin = async (input) => {
  const login = await SequelizeDB.Login.create({
    login: input.login,
    password: input.password,
    userId: input.user,
  });
  return JSON.parse(JSON.stringify(login.get()));
};

const CreateUser = async (input) => {
  const user = await SequelizeDB.User.create({
    firstName: input.firstName,
    lastName: input.lastName,
    middleName: input.middleName,
    email: input.email,
    registrationDate: new Date(),
    phone: input.phone,
    roleId: input.role,
    genderId: input.gender,
    departmentId: input.department,
  });
  return JSON.parse(JSON.stringify(user.get()));
};

const GetAllLogin = async () => {
  const loginList = await SequelizeDB.Login.findAll();
  return JSON.parse(JSON.stringify(loginList));
};

const GetAllApplicationsAdmin = async () => {
  const applicationList = await SequelizeDB.ApplicationStatus.findAll({
    include: [
      {
        model: SequelizeDB.Application,
        include: {
          model: SequelizeDB.User,
          include: {
            model: SequelizeDB.Department,
          },
        },
      },
      {
        model: SequelizeDB.Status,
      },
    ],
  });
  return JSON.parse(JSON.stringify(applicationList));
};

const GetAllStatus = async () => {
  const statusList = await SequelizeDB.Status.findAll();
  return JSON.parse(JSON.stringify(statusList));
};

const ChangeStatus = async (input) => {
  const application = await SequelizeDB.ApplicationStatus.update(
    {
      statusId: input.statusId,
    },
    {
      returning: true,

      where: {
        id: input.id,
      },
    }
  );
  return JSON.parse(JSON.stringify(application));
};

// Exports
module.exports.GetAllApplicationTemplates = GetAllApplicationTemplates;
module.exports.CreateApplicationTemplate = CreateApplicationTemplate;
module.exports.Login = Login;
module.exports.GetUserById = GetUserById;
module.exports.ChangeUser = ChangeUser;
module.exports.CreateApplication = CreateApplication;
module.exports.CreateApplicationStatus = CreateApplicationStatus;
module.exports.GetAllApplications = GetAllApplications;
module.exports.DeleteApplication = DeleteApplication;
module.exports.GetAllRoles = GetAllRoles;
module.exports.GetAllGender = GetAllGender;
module.exports.GetAllDepartment = GetAllDepartment;
module.exports.CreateLogin = CreateLogin;
module.exports.CreateUser = CreateUser;
module.exports.GetAllLogin = GetAllLogin;
module.exports.GetAllApplicationsAdmin = GetAllApplicationsAdmin;
module.exports.GetAllStatus = GetAllStatus;
module.exports.ChangeStatus = ChangeStatus;
