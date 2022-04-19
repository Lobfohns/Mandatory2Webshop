import nodemailer from "nodemailer";

export function sendEmail(email) {

    const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "ludvmandatory2@hotmail.com",
        pass: "ThisIsAFakePassWord"
        }
    });

    const options = {
        from: "ludvmandatory2@hotmail.com",
        to: email,
        subject: "you signed up at ludvigs beershop",
        text: "welcome to ludvigs beershop, thank you for signing up"
    };

    transporter.sendMail(options, function (err, info) {
        if(err) {
            console.log(err);
            return;
        }
        console.log("Sent: " + info.response);
    });

}
