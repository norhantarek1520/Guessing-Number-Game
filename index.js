
const express = require('express');
const app = express();
const ejs = require("ejs");
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
let generated_number;
let attempts = 0;
function getRandomInt() {
  return Math.floor(Math.random() * 100);
}
function checkTheNumber(generated_number, user_number, res) {
  attempts++;
  if (generated_number === user_number) {
    res.render("index.ejs", { Answer: "true", generated_number: generated_number, attempts: attempts });
    generated_number === null
  } else if (generated_number > user_number) {
    res.render("index.ejs", { Answer: "generatedNumber_high", generated_number: generated_number, attempts: attempts });
  } else {
    res.render("index.ejs", { Answer: "generatedNumber_low", generated_number: generated_number, attempts: attempts });
  }

}

app.post('/', (req, res) => {
  
  const user_number = parseInt(req.body.user_number);
  if(user_number > 100 || user_number < 0 ) res.status(404).json("Error")
  checkTheNumber(generated_number, user_number, res);

});

app.get('/', (req, res) => {
  if (!generated_number) {
    generated_number = getRandomInt();
  }
  console.log(generated_number)
  res.render('index.ejs', { Answer: null, generated_number }); // Pass generated_number to the template

});
app.get('/reset', (req, res) => {
  generated_number = null; // Reset generated_number for a new game
  attempts = 0;
  res.redirect('/'); // Redirect to the root path (home page)
});


app.listen(5000, () => { console.log("This server is runnig on port 5000") })