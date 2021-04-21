const SequelizeDB = require('./models');

// Functions
let GetAllApplicationTemplates = async () => {
    const templates = await SequelizeDB.ApplicationTemplate.findAll();
    return JSON.parse(JSON.stringify(templates));
}

let CreateApplicationTemplate = async (input) => {
    const template = await SequelizeDB.ApplicationTemplate.create({
        name: input.name,
        description: input.description
    });
    return template.get();
}

let GetLogin = async (input) => {
    const login = await SequelizeDB.Login.findAll({
        where: {
            login: input.login,
            password: input.password,
        }
    });
    return login[0] !== undefined;
}



// Exports
module.exports.GetAllApplicationTemplates = GetAllApplicationTemplates;
module.exports.CreateApplicationTemplate = CreateApplicationTemplate;
module.exports.GetLogin = GetLogin;
