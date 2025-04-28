// const Razorpay = require('razorpay');

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_SECRET,
// }); 
      
// const createOrderController = async (req, res) => {
//     const options = {
//         amount: req.body.amount * 100, // amount in smallest currency unit
//         currency: "INR",
//         receipt: "receipt#1",
//         // notes: {
//         //     key1: "value3",
//         //     key2: "value2",
//         // },
//     };

//     try {
//         const order = await razorpay.orders.create(options);
//         res.json(order);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Server Error");
//     }
// }

// module.exports = {createOrderController};
