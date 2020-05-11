const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)
const lnService = require('ln-service');
const lndKeys = require('./lndKeys')


exports.payInvoice = functions.https.onCall(async (data, context) => {
    const { lnd } = lnService.authenticatedLndGrpc(lndKeys);
    const db = admin.firestore();

    var payResponse = {}
    var error = ''
    var message = ''


    const docRef = await db.collection('users').doc(context.auth.uid).get()
        .catch(err => {
            console.log(err)
            error = 'We had a problem'
        });
    const userData = docRef.data()
    const invoice = data.invoice;
    const details = await lnService.decodePaymentRequest({ lnd, request: invoice })
        .catch(err => {
            error = "That's not a lightning invoice"
            console.log(err)
        });
    if (!error) {
        if (details.tokens <= userData.sats) {
            payResponse = await lnService.pay({ lnd, request: invoice })
                .catch((err) => {
                    console.log(err)
                    payResponse = err;
                    error = "We couldn't route the payment please contact us on twitter."
                })
        }
        else { error = "You don't have enough sats" }
    }
    if (error) {
        message = error
    }
    else {
        message = 'Paid!'
        db.collection('users').doc(context.auth.uid).update({
            sats: userData.sats - details.tokens
        })
    }

    return ({ message: message })


})


exports.addAchievement = functions.https.onCall(async (data, context) => {
    achievements = ['Answer your first question',
        'Submit your first question',
        'Get your first question approved',
        "Renegade: Answer 5 questions against the majority",
        "Conformist: Answer 5 questions in agreement with the majority"]
    const db = admin.firestore();

    if (achievements.includes(data.achievement)) {
        const doc = await db.collection('users').doc(context.auth.uid).get()
        const docData = doc.data()
        if (!docData.achievements.includes(data.achievement)) {
            db.collection('users').doc(context.auth.uid).update({
                sats: docData.sats + 300,
                achievements: admin.firestore.FieldValue.arrayUnion(data.achievement)
            })
        }

        else {
            return ('error')
        }
        return (data.achievement)
    }
    else { return ('error') }
});
