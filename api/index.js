import express from 'express';
import db from './db';

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('HelloWorld');
});

app.get('/getUsersAll', async (req, res, next) => {
  const user = await db.user.findAll({
    order: [
      ['name', req.query.sort ? req.query.sort : 'ASC'],
    ],
  });

  return res.status(200).json(user);
});

app.get('/getItemsAll', async (req, res, next) => {
  const item = await db.item.findAll({
    order: [
      ['name', req.query.sort ? req.query.sort : 'ASC'],
    ],
  });

  return res.status(200).json(item);
});

app.post('/addUser', async (req, res) => {
  if (req.body.name) {
    await db.user.create({ name: req.body.name })
      .then((user, created) => {
        console.log(user.get({ plain: true }));
        console.log(created);
      });
  }
});

app.patch('/updateUser', async (req, res) => {
  if (req.body.id && req.body.name) {
    await db.user.update({ name: req.body.name }, { where: { id: req.body.id }, returning: true })
      .then((result) => {
        res.json(result[1][0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.delete('/deleteUser/:id', async (req, res) => {
  if (req.params.id) {
    await db.user.destroy({ where: { id: req.params.id } })
      .then((result) => {
        res.json({});
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.post('/addItem', async (req, res) => {
  if (req.body.name && req.body.userId && req.body.imagePath) {
    await db.item.create({ name: req.body.name, user_id: req.body.userId, image_path: req.body.imagePath })
      .then((user, created) => {
        console.log(user.get({ plain: true }));
        console.log(created);
      });
  }
});

app.patch('/updateItem', async (req, res) => {
  if (req.body.id && req.body.name && req.body.userId && req.body.imagePath) {
    await db.item.update({ name: req.body.name, user_id: req.body.userId, image_path: req.body.imagePath }, { where: { id: req.body.id }, returning: true })
      .then((result) => {
        res.json(result[1][0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.delete('/deleteItem/:id', async (req, res) => {
  if (req.params.id) {
    await db.item.destroy({ where: { id: req.params.id } })
      .then((result) => {
        res.json({});
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = {
  path: 'api',
  handler: app,
};
