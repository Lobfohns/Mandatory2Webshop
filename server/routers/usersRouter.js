import { Router } from "express";
import db from "../database/createConnection.js"
import bcrypt from "bcrypt";
import { sendEmail } from "../nodemailer.js";

const router = Router();

router.get("/api/users", async (req, res) => {
    const users = await db.all("SELECT * FROM users;");

    res.send({ data: users })
})

router.post("/auth/signup", async (req, res) => {
    try {
    const {email, password} = req.body;
    const hash = await bcrypt.hash(password, 10);
    await db.run(`INSERT INTO users (email, password) values (?, ?)`, [email, hash]);
    sendEmail(email);
    res.status(200).json('Signup Succesful!');
    } catch(e) {
        console.log(e);
        res.status(500).send("something broke!");
    }
    
});

router.post('/auth/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            res.status(400).json(`Missing ${!email ? "email" : 'password'}!`)
        }

        const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email])

        if(user) {
            const validPass = await bcrypt.compare(password, user.password);
            if(validPass) {
                req.session.loggedIn = true;
                req.session.currentUser = user;
                res.status(200).json('Login Successful!');
            } else {
                res.status(400).json('Wrong password!');
            }
        } else {
            res.status(404).json('User not found!');
        }

    } catch(e) {
        // console.log(e); // for debugging
        res.status(400).json('Something broke!');
    }
});


    router.get("/auth/logout", (req, res) => {
        if (req.session.loggedIn) {
            req.session.loggedIn = false;
            return res.send("You logged out")
        }
        res.send("Not logged in");
    });
    
    


export default router;



/* some other stuff i was working on
router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await db.get(`SELECT * from users WHERE email = ?`, [email])

    if (!user || !password) {
        res.status(400)
        return res.send("Wrong username and/or password");
    }

    if ( user.password === password) {
        req.session.loggedIn = true;
        req.session.currentUser = user;
        res.status(200).json('Login succesful!');
    }
    else {
        return res.send("Something went wrong");
    }
    });
*/