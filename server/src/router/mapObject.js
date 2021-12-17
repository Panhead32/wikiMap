const pgQ = require('../utils/pg')
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { rows } = await pgQ.many(`select * from wiki.objeccts where id = '${id}'`)
  res.send(rows[0])
})

router.post('/', async (req, res) => {
  const id = req.query?.id
  let q = id ? `update wiki.objeccts set description = 'test1' where id = '${id}'`
  : `INSERT INTO wiki.objeccts(
    short_name, name, id, description, coordinates, image)
    VALUES ('short_name', 'short_name', '${uuidv4()}', 'short_name', '(1,2)', 'short_name');`;
  console.log(q);
  await pgQ.many(q);
  res.send('Done')
})

module.exports = router;