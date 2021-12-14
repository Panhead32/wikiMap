const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path')

let { PORT } = require('./config/config');
PORT = PORT ? PORT : process.env.PORT;


const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'scripts')))
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.static(path.join(__dirname, 'storage')))

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
})
