const pgQ = require('../utils/pg')
const express = require('express');
const path = require('path')
const fs = require('fs-extra')
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const config = require('../../config/config')

router.get('/all', async (req, res) => {
  const { rows } = await pgQ.many(`select id, coordinates from wiki.objeccts`)
  res.send(rows)
})


router.get('/image/get/:id', async (req, res) => {
  if (!req.params?.id) return res.status(500).send('Id params missed');
  const { rows } = await pgQ.many(`select image from wiki.objeccts where id = '${req.params.id}'`);
  const filePath = rows?.[0]?.image;
  if (!filePath) return res.status(204).send('No such file')
  const fileData = await fs.readFileSync(filePath, 'base64', (err) => console.error(err));
  return res.send({fileData});
})

router.get('/:id', async (req, res) => {
  if (!req.params?.id) res.send('no params')
  const { id } = req.params
  const { rows } = await pgQ.many(`select * from wiki.objeccts where id = '${id}'`)
  return res.send(rows)
})


router.delete('/:id', async (req, res) => {
  if (!req.params?.id) res.send('no params')
  const { id } = req.params
  await pgQ.many(`delete from wiki.objeccts where id = '${id}'`)
  return res.send('Done')
})


router.put('/:id', async (req, res) => {
  if (!req.params?.id) res.send('no params')
  const { id } = req.params
  const body = req.body;
  await pgQ.many(`UPDATE wiki.objeccts SET (short_name, name, id, description, coordinates, image) = ('${body.short_name}', '${body.name}', '${uuidv4()}', '${body.description}', '(${body?.coordinates?.join(',')})', '${imgPath}')
  WHERE id = '${id}'`)
  return res.send('Success')
})


router.post('/', async (req, res) => {
  const body = JSON.parse(req.body.body);
  const files = req?.files;
  const imgPath = files?.file?.name ? path.resolve(config.imgdir, files.file.name) : '';
  const { id } = body
  let q = `INSERT INTO wiki.objeccts(
    short_name, name, id, description, coordinates, image)
    VALUES ('${body.short_name}', '${body.name}', '${uuidv4()}', '${body.description}', '(${body?.coordinates?.join(',')})', '${imgPath}');`;
  if (files) await fs.writeFile(imgPath, files.file.data, (err) => { if (err) console.log(err); return;});
  await pgQ.many(q);
  return res.send('Done')
})

module.exports = router;