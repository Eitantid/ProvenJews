const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

app.locals.layout = false; 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/send', (req, res) => {
    const output = 
`    <p>new request</p>
    <h3>contact details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Name: ${req.body.email}</li>

    </ul>`;
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'velda.schoen67@ethereal.email', // generated ethereal user
            pass: '8mh9SRrjtKxDtNeePj'  // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
      });
    
      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Nodemailer Contact" <velda.schoen67@ethereal.email>', // sender address
          to: 'eitantid@gmail.com', // list of receivers
          subject: 'Node Contact Request', // Subject line
          text: 'Hello world?', // plain text body
          html: output // html body
      };
    
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
          res.render('contact', {msg:'Email has been sent'});
      });
      });
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('contact');
});

app.listen(3000, () => console.log('server up'))