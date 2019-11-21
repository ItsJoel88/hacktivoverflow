const nodemailer = require('nodemailer')
const kue = require('kue')
let jobs = kue.createQueue()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'newljodi@gmail.com',
        pass: 'screamaimfire123'
    }
});

let mail = {
    subject: 'Someone upvote your question !',
    to: req.body.to,
    from: 'newljodi@gmail.com',
    html: '<p>Your question is rising up,seems like you getting closer to the answer </p>'
}


// function sendMail(title, to, subject, message, done) {
//     let email = jobs.create('email', { title, to, subject, message })
//     done()
// }
let job = jobs.create('email', mail).save()

jobs.process('email', function (job, done) {
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log('Error : ' + err);
        }
        console.log('Mail sent: ' + info.response);
    });
})

// router.post('/', function(req, res, next) {
//     queue.process('email', function(job, done){
//       const {title,to,subject,message} = req.body;
//       // use nodemailer or another tool to send an email
//       sendEmail(title,to,subject,message);
//     });
//   });