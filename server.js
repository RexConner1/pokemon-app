require('dotenv').config()
const express = require('express');
const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use('/pokemon', require('./controllers/pokemonController.js'));
app.use('/players', require('./controllers/playersController.js'));

app.get('/', (req, res) => {
  res.render('players/index.ejs');
});

app.listen(process.env.PORT, ()=>{
  console.log("Listening");
});