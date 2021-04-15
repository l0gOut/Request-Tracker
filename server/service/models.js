const { Sequelize, DataTypes } = require('sequelize');

// Connection to database
const SequelizeDB = new Sequelize('request_tracker', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
});

// Models
const Gender = SequelizeDB.define('gender', {
    codeGender: {
        type: DataTypes.STRING(10),
        allowNull: false,
        
    },
    genderName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'gender',
});

const Role = SequelizeDB.define('role', {
    roleName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'role',
});

const Department = SequelizeDB.define('department', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'department',
});

const User = SequelizeDB.define('user', {
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    middleName: {
        type: DataTypes.STRING(50)
    },
    login: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    registrationDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    // Foreign key Role
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Foreign key Gender
    genderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Foreign key Department
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'user',
});

const ApplicationTemplate = SequelizeDB.define('applicationTemplate', {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'application_template'
});

const Status = SequelizeDB.define('status', {
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'status'
});

const Application = SequelizeDB.define('application', {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    // Foreign key User
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'application'
});

const ApplicationStatus = SequelizeDB.define('applicationStatus', {
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    // Foreign key Application
    applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Foreign key Status
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'application_status'
});

// Associations
User.belongsTo(Role, {
    foreignKey: 'roleId'
});

User.belongsTo(Gender, {
    foreignKey: 'genderId'
});

User.belongsTo(Department, {
    foreignKey: 'departmentId'
});

Application.belongsTo(User, {
    foreignKey: 'userId'
});

ApplicationStatus.belongsTo(Application, {
    foreignKey: 'applicationId'
});

ApplicationStatus.belongsTo(Status, {
    foreignKey: 'statusId'
});

// Exports
module.exports.Sequelize = SequelizeDB;
module.exports.Gender = Gender;
module.exports.Role = Role;
module.exports.Department = Department;
module.exports.User = User;
module.exports.ApplicationTemplate = ApplicationTemplate;
module.exports.Status = Status;
module.exports.Application = Application;
module.exports.ApplicationStatus = ApplicationStatus;