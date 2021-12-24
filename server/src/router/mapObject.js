const pgQ = require('../utils/pg')
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
router.get('/all', async (req, res) => {
  const { rows } = await pgQ.many(`select id, coordinates from wiki.objeccts`)
  console.log(rows);
  res.send(rows)
})

router.get('/:id', async (req, res) => {
  if (!req.params) res.send('no params')
  const { id } = req.params
  const { rows } = await pgQ.many(`select * from wiki.objeccts where id = '${id}'`)
  res.send(rows)
})


router.post('/', async (req, res) => {
  const id = req.query?.id
  console.log(req.body);
  let q = id ? `update wiki.objeccts set description = 'test1' where id = '${id}'`
  : `INSERT INTO wiki.objeccts(
    short_name, name, id, description, coordinates, image)
    VALUES ('short_name', 'short_name', '${uuidv4()}', 'short_name', '(1,2)', 'short_name');`;
  console.log(q);
  await pgQ.many(q);
  res.send('Done')
})

module.exports = router;