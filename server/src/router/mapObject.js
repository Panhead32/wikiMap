const pgQ = require('../utils/pg')
const express = require('express');
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const config = require('../../config/config')

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
  const body = JSON.parse(req.body.body);
  const files = req?.files;
  const imgPath = files?.file?.name ? path.resolve(config.imgdir, files.file.name) : '';
  const { id } = body
  let q = id ? `update wiki.objeccts set description = 'test1' where id = '${id}'`
  : `INSERT INTO wiki.objeccts(
    short_name, name, id, description, coordinates, image)
    VALUES ('${body.short_name}', '${body.name}', '${uuidv4()}', '${body.description}', '(${body?.coordinates?.join(',')})', '${imgPath}');`;
    console.log(q);
  if (files) fs.writeFile(imgPath, files.file.data, (err) => { if (err) console.log(err); return;});
  await pgQ.many(q);
  res.send('Done')
})

module.exports = router;