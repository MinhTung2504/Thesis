var paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

export const payBooking = (req, res) => {
  console.log(req.body);
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `http://localhost:${process.env.PORT}/api/${req.params.bookingId}/success`,
      cancel_url: `http://localhost:${process.env.PORT}/api/cancel`,
    },
    transactions: [
      {
        item_list: {
          items: [req.body],
        },
        amount: {
          currency: "USD",
          total: req.body.price,
        },
        description: `This is the payment for booking of ${req.body.name}`,
      },
    ],
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.render("cancel");
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          console.log(JSON.stringify(payment));
          //   res.redirect(payment.links[i].href);
          //   console.log(payment.links[i].href);
          res.send(payment.links[i].href);
        }
      }
    }
  });
};

export const successPayment = (req, res) => {
  // console.log(req.params.bookingId);
  const bookingId = req.params.bookingId;
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        res.send(error);
      } else {
        // console.log(JSON.stringify(payment));
        res.redirect(`http://localhost:3000/success-payment/${bookingId}`);
      }
    }
  );
};

export const cancelPayment = (req, res) => {
  res.redirect("http://localhost:3000/cancel-payment");
};
