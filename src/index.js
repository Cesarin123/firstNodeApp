const express =  require('express');
const app = express();
const path = require('path');


//settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//routes
app.use(require('./routes/index'));



//middlewares


//static files
app.use(express.static(path.join(__dirname, 'public')))

////
app.listen(app.get('port'), () => {

    console.log('Server started on port',app.get('port'))

});



