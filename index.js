require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { paymentRequest } = require("./mobicash/payment_request");
const { giveChangeRequest } = require("./mobicash/give_change_request");
const { checkTransactionStatus } = require("./mobicash/check_transaction_status");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/Live_402_GabonTelOnlineMerchantPaymentAPI/rest/v1/payment", (req, res) => {
    const result = paymentRequest(
        req.body.subscriberMsisdn,
        req.body.merchantMsisdn,
        req.body.transactionAmount,
        req.body.externalReference,
        req.body.chargePayor
    );
    res.send(result);
})

app.post("/Live_402_GabonTelOnlineMerchantPaymentAPI/rest/v1/givechange", (req, res) => {
    const result = giveChangeRequest(
        req.body.subscriberMsisdn,
        req.body.merchantMsisdn,
        req.body.transactionAmount,
        req.body.externalReference,
        req.body.chargePayor
    );
    res.send(result);
})

app.post("/Live_402_GabonTelOnlineMerchantPaymentAPI/rest/v1/checktrans", (req, res) => {
    const result = checkTransactionStatus(
        req.body.externalReference,
    );
    res.send(result);
})

const port = process.env.PORT;
app.listen(
    port,
    () => console.log("Listenning on " + port)
);