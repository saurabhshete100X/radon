const express = require('express');
const bodyParser = require('body-parser');
const route = require('./src/route/route');
const {
	default: mongoose
} = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


mongoose.connect("mongodb+srv://saurabhshete281:JBmRPjzC58VOejIX@cluster0.jih1tjw.mongodb.net/saurabh-BlogProject", {
		useNewUrlParser: true
	})
	.then(() => console.log("MongoDb is connected"))
	.catch(err => console.log(err))

// app.use (
//     function (req, res, next) {
//         console.log ("inside GLOBAL MW");
//         next();
//   }
//   );

app.use('/', route);


app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});