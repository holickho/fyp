const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parse');


// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user,
    layout: 'mainLayout',
  })
);

// Translate
router.get('/translate', ensureAuthenticated, (req, res) =>
  res.render('translate.ejs', {
    user: req.user,
    layout: 'mainLayout',
  })
);

//CSV (workable)
// const upload = multer({ dest: 'uploads' });

// //with multer...//post
// router.post('/csv', upload.single('myfile'), function (req, res) {
//   var file = req.file;
//   let upload = multer({
//     storage: storage,
//     fileFilter: function(req, file, callback) {
//         let ext = path.extname(file.originalname)

//         callback(null, true)
//     }
// }).single('myfile');
// upload(req, res, function(err) {
//     res.end('File is uploaded')
// })

//   //read
//   fs.createReadStream(file.path).pipe(csv()).on('data', function (data) {

//     console.log(data, "this is data.....");
//     res.json(data);

//   });

// });

// Sentiment Analysis sample
// var Sentiment = require('sentiment');
// var sentiment = new Sentiment();

// var docx = sentiment.analyze("I like apples");
// console.log(docx);

// // Applying to An Array
// var mydocx = ["I love apples","I don't eat pepper","the movie was very nice","this book is the best"]

// mydocx.forEach(function(s){
//   console.log(sentiment.analyze(s));
// })

//Import csv & export csv
// const Product = require('../models/Product');
// var csvfile = __dirname + "/../public/files/products.csv";
// var stream = fs.createReadStream(csvfile);

// /* GET home page. */
// router.get('/', function(req, res, next) {

//   res.render('index', { title: 'Import CSV using NodeJS' });

// }).get('/import', function(req, res, next) {

//   var  products  = []
//   var csvStream = csv()
//       .on("data", function(data){

//        var item = new Product({
//             name: data[0] ,
//             price: data[1]   ,
//             category: data[2],
//             description: data[3],
//             manufacturer:data[4] 
//        });

//         item.save(function(error){
//           console.log(item);
//             if(error){
//                  throw error;
//             }
//         }); 

//   }).on("end", function(){

//   });

//   stream.pipe(csvStream);
//   res.json({success : "Data imported successfully.", status : 200});

// }).get('/fetchdata', function(req, res, next) {

//   Product.find({}, function(err, docs) {
//       if (!err){ 
//           res.json({success : "Updated Successfully", status : 200, data: docs});
//       } else { 
//           throw err;
//       }
//   });

// });

//Upload File (Final)
// SET STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../node_passport_login-master/views/upload')
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

router.get('/uploadFile', (req,res)=>{
  res.render('uploadFile');
})
// Uploading single file
router.post('/uploadfile', upload.single('file'), (req, res, next) => {
  const file = req.file
  if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
  }
  //res.attachment('product.csv'); //download the file
  // res.send("File uploaded")

  //read and display file of content
  // fs.readFile(req.file.path, function (err, data) {
  //   if (err) throw err;
  //   data will contain your file contents
  //   res.writeHead(200, { "content-type": "text/plain" });
  //   res.write(data);
  //   res.end();
  //   console.log(data);

  // })

});

// read file
// var content = fs.readFileSync('public/files/products.csv','utf8');
// console.log(content);

//redirect to sentiment page
router.get('/sentiment', (req, res) => {
  res.render('sentiment');
});

// router.post('/button', (req,res) =>{
//   console.log('Client-side code running');
//   const button = req.body;
//   button = document.getElementById('myButton');
//   button.addEventListener('click', function(e) {
//     console.log('button was clicked');
//   });
//   res.redirect('sentiment.ejs')
// });

module.exports = router;
