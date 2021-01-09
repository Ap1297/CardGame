const mongoose = require('mongoose');

const User = mongoose.model('User');

const passport = require('passport');

const _= require('lodash');
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");


// Forgot Password 
module.exports.forgot = (req, res, next) =>{
    
    async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
         // req.flash('error', 'No account with that email address exists.');
           return res.status(404).json({ status: false, message: 'User record not found.' });
         
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        host: "smtpout.secureserver.net",  
        secure: true,
        secureConnection: false, // TLS requires secureConnection to be false
        tls: {
            ciphers:'SSLv3'
        },
        requireTLS:true,
        port: 465,
        debug: true,
        auth: {
            user: "an.panchal97@gmail.com",
            pass: "Ganesh@1297" 
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'an.panchal97@gmail.com',
        subject: 'Card Game Account Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'localhost:4200/reset\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
      //  req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          console.log('An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
      res.status(200).send(['Email Is Sent SuccessFully']);   
  });
    
}

// reset Password 
module.exports.reset = (req, res, next) =>{
   
  async.waterfall([
    function(done) {
     User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
         // req.flash('error', 'No account with that email address exists.');
           return res.status(404).json({ status: false, message: 'User record not found.' });
         
        }
        if(req.body.password === req.body.confirm) {
        
     
    user.password = req.body.password;
    
    user.save(function(err) {
          done(err,user);
        });
            
        } else {
            console.log("error", "Passwords do not match.");
             return done(null, false, { message: 'Passwords do not match.' });
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        host: "smtpout.secureserver.net",  
        secure: true,
        secureConnection: false, // TLS requires secureConnection to be false
        tls: {
            ciphers:'SSLv3'
        },
        requireTLS:true,
        port: 465,
        debug: true,
        auth: {
            user: "an.panchal97@gmail.com",
            pass: "Ganesh@1297" 
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'an.panchal97@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
       console.log('mail sent');
      //  req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          console.log('This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
      res.status(200).send(['Email Is Sent SuccessFully']);   
  });
}


module.exports.register = (req,res, next) =>{

    var user = new User();
    
    user.fullName = req.body.fullName;
    
    user.email = req.body.email;
    
    user.password = req.body.password;
    
    user.ipaddress = req.body.ipaddress;
    
    user.mobileNo = req.body.mobileNo;
    
    user.userType = req.body.userType;
    user.save((err, doc) => {
    
      if(!err)
      {
        res.send(doc);
      }
      else{
           if(err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
      }
    
    });

}





module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(404).json(err);
        // registered user
        if (user) return res.status(200).json({ "token": user.generateJwt(),user});
        // unknown user or wrong password
        else return res.status(401).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user});
        }
    );
}

module.exports.getUser = (req, res, next) =>{
     User.find({},function(err,data){
        if(err)
            {
                 return res.status(404).json({ status: false, message: 'No User Found' });
            }
        else
        {
             return res.status(200).json(data);
        }
    });

}

module.exports.deleteUser = (req, res, next) =>{
    console.log(req.email);

    User.deleteOne({_email:req._email }, function(err){
        if(err)
            {
                return res.status(404).json({ status: false, message: 'Unable To delete' });
            }
        else{
          return res.status(200).json({data:'Record Has Been Deleted'});
        }
    });
}


module.exports.updateUser = (req, res, next) =>{
   
  async.waterfall([
    function(done) {
     User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
         // req.flash('error', 'No account with that email address exists.');
           return res.status(404).json({ status: false, message: 'User record not found.' });
         
        }
        else{
        
     user.email = req.body.email;
    user.fullName = req.body.fullName;
    user.password = req.body.password;
    user.mobileNo = req.body.mobileNo;
    user.ipaddress = req.body.ipaddress; 
    user.userType =  req.body.userType;        
    user.save((err, doc) => {
    
      if(!err)
      {
        res.send(doc);
      }
      else{
           if(err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
      }
    
    });
        }
     });
    }
  ], function(err) {
    if (err) return next(err);
      res.status(200).send(['Data Updated successfully']);   
  });
    
}

