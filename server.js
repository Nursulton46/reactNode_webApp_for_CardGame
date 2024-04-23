if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const User=require('./models/user')
const userRoutes=require('./routes/user')
//const nonUserRoutes=require('./routes/nonUser')
//const chatRoutes=require('./routes/inUser')
//

const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
//const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');




//
const dbUrl = 'mongodb://127.0.0.1:27017/proj4Card';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
});

mongoose.set('strictQuery',true);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open",function(){
    console.log("db connected");
})



const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(mongoSanitize({
    replaceWith: '_'
}))


const secret = 'thisshouldbeabettersecret!';
const sessionConfig = {
    name: 'session',
    secret:secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


app.use('/', userRoutes);
//app.use('/', nonUserRoutes)
//app.use('/', chatRoutes)
//


//{
//  email: 'kk@gmail.com',
//  password: ',Y9M*HZ4k6cJf52',
//  firstName: 'n',
//  lastName: ''
//}






app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    console.log( res.status(statusCode) , err )
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
















