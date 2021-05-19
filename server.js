const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({ 

    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename : function(req, file, cb ) {
        cb(null, file.originalname);
    }
})
const upload = multer( { storage : storage });


app.use(express.urlencoded({ extended : true }));
// app.set('view engine', 'ejs');

app.get('/', async (req, res, next) => {
    // res.render('upload-form');
    res.sendFile(__dirname + '/index.html');
})

app.post('/', upload.single('myFile'), async (req, res, next) => {

    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file.');
        return next(error);
    }
    res.send("File Uploaded Successfully..");
})

app.use((err, req, res, next) => {
    console.log(err.status)
    res.send(err.message);
})

app.listen(8080, () => console.log("Server is up and listening at  8080"));