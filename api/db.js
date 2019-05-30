import Sequelize from 'sequelize';
import User from './models/user';
import Item from './models/item';
import config from '../config/config.api.json';

const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, config.database);
const user = User(sequelize, Sequelize);
const item = Item(sequelize, Sequelize);

async function initDB(isDrop) {
  return sequelize.sync({ force: isDrop });
}

async function createDummy() {
  const userName = 'test';
  const dataCntUser = await user.count().then((c) => {
    return c;
  });

  if (dataCntUser === 0) {
    await user.create({
      name: userName,
    });

    const dummyDataId = await user.findOne({ where: { name: userName } })
      .then((project) => {
        return project.get('id');
      });

    await item.create({
      name: `test_${dummyDataId}`,
      image_path: 'https://www.creatrip.com:9999/uploads/500/20190207/新沙洞商圈0.jpg',
      user_id: dummyDataId,
    });
  }
}

export default {
  sequelize,
  user,
  item,
  initDB,
  createDummy,
};
