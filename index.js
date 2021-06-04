const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { db_url, PORT } = require('./keys');
const Route = require('./routes/Router');

// important middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use(Route);

// static files route
app.use(express.static('client'));
app.use('/css', express.static(__dirname + 'client/css'));
app.use('/js', express.static(__dirname + 'client/js'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html')
});

app.get('/add', (req, res) => {
    res.sendFile(__dirname + '/client/form.html')
});

// database connection
mongoose.connect(db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log("connected to database")
)

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is up and running.`);
});