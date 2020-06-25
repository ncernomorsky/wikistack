const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

// field	description
// title	the page's title
// slug	a url-safe version of the page title, for links
// content	the page content
// status	if the page is open or closed
// USER
// field	description
// name	full name of the user
// email	a unique, identifying email address

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
  },
});

Page.beforeValidate((pageInstance, optionsObject) => {
  pageInstance.slug = pageInstance.title
    .replace(/\s+/g, "_")
    .replace(/\W/g, "");
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = {
  db,
  Page,
  User,
};
