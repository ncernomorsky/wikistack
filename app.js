const express = require("express");
const morgan = require('morgan');

const models = require('./models');

const mainView = require('./views/main');



const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
app.use('/wiki', wikiRouter);

app.get("/", (req, res) => {
    res.redirect("/wiki");
})


// app.get("/", (req, res) => {
//     res.send(mainView())
// })


// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

const PORT = 1337;

const init = async () => {
    //await models.db.sync({force: true});
    await models.db.sync();
    //console.log('DB synced...');
    app.listen(PORT, () => {
        console.log(`App listening in port ${PORT}`);
    });
}

init();
  

  