const express = require('express');
const path = require('path');
const cors = require('cors');
// const passport = require('passport');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Start express
const app = express();
//Setup CORS (needed for angular to be able to send HTTP requests to the server)
app.use(cors());

//Initializing Mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/ThinkBudget-Simple', (err) => {
    if (err){console.log(err);}
    console.log("Connected to db");
});

//Initializing middleware
app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(session({ secret: 'thinkbudget' }));

//Passport stuff
//require('./config/passport.js')(app);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Set routes
app.use('/api/budgets', require('./routes/api/budgets'));
app.use('/api/transactions', require('./routes/api/transactions'));

//Start server listening
app.listen(3000, () => {
    console.log('Server is listening on port: 3000');
});