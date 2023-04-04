const express = require("express");
const router = express.Router();
const cors = required("cors");
const nodemailer = require("nodemailer");

const app =express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kritika.tripathi03@gmail.com",
        pass: "naxrpdjsiczlpcxj"
    }
});
//missed a syntax
//go to cmd to your directory and type npm server
//go to gmail -> account security -> application password/
//naxrpdjsiczlpcxj
contactEmail.verify((error) => {
    if(error) {
        console.log(error);
    } else{
        console.log("Ready to Send");
    }
});

router.post("/contact", (req, res) => {
    const name = req.body.firstName + req.body.lastName;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
    const mail = {
        from : name,
        to: "kritika.tripathi03@gmail.com",
        subject: "Contact Form Submission - Portfolio",
        html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Phone: ${phone}</p>
               <p>Message: ${message}</p>`
    };
    contactEmail.sendMail(mail, (error) =>{
        if(error) {
            res.json(error);
        } else{
            res.json({code: 200, status: "Message Sent"});
        }
    });
});

