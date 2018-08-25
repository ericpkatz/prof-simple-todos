const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const Todo = conn.define('todo', {
  name: Sequelize.STRING
});

const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(()=> Promise.all([
      Todo.create({ name: 'learn react' }),
      Todo.create({ name: 'create an app' }),
      Todo.create({ name: 'create another app' }),
    ]));
};

module.exports = {
  models: {
    Todo
  },
  syncAndSeed
};
