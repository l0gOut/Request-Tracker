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

let GetUser = async (input) => {
    const user = await SequelizeDB.User.findOne({
        where: {
            login: input.login,
            password: input.password
        },
        
    });
    console.log(user)
    return user.get();
}

// Exports
module.exports.GetAllApplicationTemplates = GetAllApplicationTemplates;
module.exports.CreateApplicationTemplate = CreateApplicationTemplate;
module.exports.GetUser = GetUser;
