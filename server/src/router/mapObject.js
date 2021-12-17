const pgQ = require('../utils/pg')
var express = require('express');
var router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { rows } = await pgQ.many(`select * from wiki.objeccts where id = '${id}'`)
  res.send(rows[0])
})

router.post('/:id', async (req, res) => {
  const { id } = req.params
  const { rows } = await pgQ.many(`update wiki.objeccts set description = 'test1' where id = '${id}'`)
  res.send(rows[0])
})

router.post('/:id', async (req, res) => {
  const { id } = req.params
  const { rows } = await pgQ.many(`select * from wiki.objeccts where id = ${id}`)
})
module.exports = router;