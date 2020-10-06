const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const exphbs = require('express-handlebars');
const FileStore = require('session-file-store')(session);

const viewControllers = require('./app/routes');
const database = require('./database/index');
const sessionSettings = {
    store: new FileStore({}),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {},
};

app.set('views', path.join(__dirname, '/app/views'));

const handlebars = exphbs.create({
    layoutsDir: path.join(__dirname, '/app/views/layouts'),
    partialsDir: path.join(__dirname, '/app/views/partials'),
    defaultLayout: 'layout',
    extname: '.hbs',
});

database.sequelize.authenticate();

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.use(require('cookie-parser')());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(session(sessionSettings));

app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(viewControllers);
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
