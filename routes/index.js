var express = require('express');
var router = express.Router();

const qr = require('qr-image');
const fs = require('fs');

var firebase = require('firebase/app');
require('firebase/database');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEI1f9q81dnRoqR9cqMYJDmKMEMkfKmXs",
  authDomain: "fullmotionpicture.firebaseapp.com",
  databaseURL: "https://fullmotionpicture.firebaseio.com",
  projectId: "fullmotionpicture",
  storageBucket: "fullmotionpicture.appspot.com",
  messagingSenderId: "708185644840",
  appId: "1:708185644840:web:21093a1912b3300f3d7a1d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Full Motion' }); //ithupole kodukkanam.
});

router.post('/bookerFuck', (req, res) => {
  var ID = '_' + Math.random().toString(36).substr(2, 9);
  database.ref('users/'+ID).set({
    name: req.body.name,
    email: req.body.email,
    phone : req.body.phone
  });

  // Get the text to generate QR code
  let qr_txt = ID;

    
  // Generate QR Code from text
  var qr_png = qr.imageSync(qr_txt,{ type: 'png'})
  // Generate a random file name 
  let qr_code_file_name = new Date().getTime() + '.png';

  fs.writeFileSync('./public/qr/' + qr_code_file_name, qr_png, (err) => {
      
      if(err){
          console.log(err);
      }
      
  })



  console.log('./public/qr/' + qr_code_file_name);
  res.render('booking', { title : "Full Motion", pic : '../public/qr/' + qr_code_file_name, uid: 'https://api.qrserver.com/v1/create-qr-code/?data=' + qr_txt + '&amp;size=400x400', uidl: qr_txt } )
})

module.exports = router;
