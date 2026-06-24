import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import pool from "../config/db.js";
import createNotification
from "../utils/createNotification.js";

export const createOrder =
async (req, res) => {

  try {

    const {
      amount
    } = req.body;

    const options = {

      amount:
        amount * 100,

      currency:
        "INR",

      receipt:
        `receipt_${Date.now()}`

    };

    const order =
      await razorpay.orders.create(
        options
      );

    res.json(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Failed to create order"

    });

  }

};

export const verifyPayment =
async (req, res) => {

  try {

    const {

      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature,

      bountyId,

    } = req.body;

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          razorpay_order_id +
          "|" +
          razorpay_payment_id
        )
        .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Payment verification failed",

      });

    }

await pool.query(

  `
  UPDATE bounties
  SET
    funded = true,
    payment_status = 'Paid',
    razorpay_order_id = $1
  WHERE id = $2
  `,

  [
    razorpay_order_id,
    bountyId
  ]

);

const bounty =
  await pool.query(

    `
    SELECT
      owner_id,
      title
    FROM bounties
    WHERE id = $1
    `,

    [bountyId]

  );

await createNotification(

  bounty.rows[0].owner_id,

  `Bounty "${bounty.rows[0].title}" has been funded`

);

    res.json({

      success: true,

      message:
        "Payment verified",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Verification failed"

    });

  }

};