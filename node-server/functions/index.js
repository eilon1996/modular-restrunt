const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const myFunction = (value) => (value.length)

exports.getLength = functions.https.onRequest((req, res) => {
    const text = req.query.text;
    const length = myFunction(text);

    admin.database()
        .ref('/mess')
        .push({text:length})
        .then(() => 
            res.json({
                message:"worked",
                text
        }))
        .catch(() => {
            res.json({
                message:"didnt work"
            })
        })
});