 require("dotenv").config();
// console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
// console.log("KEY SECRET:", process.env.RAZORPAY_KEY_SECRET);
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const Products = require("./Products");
const Users = require("./Users");
const admins = require("./admins");
const Orders = require("./Orders");
const enquiry = require("./enquiry");
const jwt = require("jsonwebtoken");


const app = express();
const port = process.env.PORT || 8000;
const dotenv = require("dotenv");
dotenv.config();
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// connection url

// const connection_url =
//   "mongodb+srv://kalyaniambhore98:G-9140K-98@cluster0.qpkiom4.mongodb.net/grin_energy?retryWrites=true&w=majority";

// mongoose.connect(connection_url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//  .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

const connection_url = process.env.MONGO_URI;

mongoose.connect(connection_url)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

  
app.use("/uploads",express.static('uploads'));
const multer = require('multer');
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder name
  },
  filename: (req, file, cb) => {
     cb(null, Date.now() + path.extname(file.originalname));
    // cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });
     
// API

app.get("/", (req, res) => res.status(200).send("Home Page"));




// app.post("/products/add", upload.single("image"), async(req, res) => {
//   const { title, description, price,gst, rating, ...rest } = req.body;

//   const customFields = {};
//   for (const key in rest) {
//     customFields[key] = rest[key];
//   }

//   const productDetail = {
//     title,
//     description,
//     price,
//     gst,
//     rating,
//     customFields,
//     imageURL: req.file ? `/uploads/${req.file.filename}` : ""
//   };

//   Products.create(productDetail, (err, data) => {
//     if (err) {
//       res.status(500).send(err.message);
//     } else {
//       res.status(201).send(data);
//     }
//   });
// });

app.post("/products/add", upload.single("image"), async (req, res) => {
   console.log("🔥 ADD PRODUCT API CALLED");
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);
    const {
      title,
      description,
      price,
      gst,
      rating,
      customFields
    } = req.body;
    
        const priceNumber = Number(price) || 0;
    const gstNumber = Number(gst) || 0;

     const gstAmount = (priceNumber * gstNumber) / 100;
     const totalPrice = priceNumber + gstAmount;


    let parsedCustomFields = {};

    if (customFields) {
      parsedCustomFields = JSON.parse(customFields);
    }

    const productDetail = {
      title,
      description,
      // price: Number(price),
      // gst: Number(gst),
      price: priceNumber,
      gst: gstNumber,
       gstAmount: gstAmount,
      totalPrice: totalPrice,
       rating: Number(rating) || 0,
      customFields: parsedCustomFields,
      imageURL: req.file
        ? `/uploads/${req.file.filename}`
        : ""
    };
console.log("Product going to MongoDB:");
    console.log(productDetail);
    const product = await Products.create(productDetail);
     console.log("✅ PRODUCT SAVED:");
    console.log(product);

    res.status(201).json(
      {
      message: "Product added successfully",
      product
    });

  } catch (err) {
    console.error("Error adding product:", err);

    res.status(500).json({
      message: "Error adding product",
      error: err.message
    });
  }
});


app.get("/products/get", (req, res) => {
  Products.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});


// Count products
app.get("/products/count", async (req, res) => {
  try {
    const count = await Products.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API for SIGNUP

app.post("/auth/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  const encrypt_password = await bcrypt.hash(password, 10);

  const userDetail = {
    email: email,
    password: encrypt_password,
    fullName: fullName,
  };

  const user_exist = await Users.findOne({ email: email });

  if (user_exist) {
    res.send({ message: "The Email is already in use !" });
  } else {
    Users.create(userDetail, (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.send({ message: "User Created Succesfully" });
      }
    });
  }
});


// API for LOGIN
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const userDetail = await Users.findOne({ email: email });

  if (userDetail) {
    if (await bcrypt.compare(password, userDetail.password)) {
      res.send(userDetail);
    } else {
      res.send({ error: "invaild Password" });
    }
  } else {
    res.send({ error: "user is not exist" });
  }
});



// APi AdminSignup

app.post("/admins/adminsignup", async (req, res) => {
  const { email, password, adminName } = req.body;

  const encrypt_password = await bcrypt.hash(password, 10);

  const adminsDetail = {
    email: email,
    password: encrypt_password,
    adminName: adminName,
  };

  const admin_exist = await admins.findOne({ email: email });

  if (admin_exist) {
    res.send({ message: "The Email is already in use !" });
  } else {
    admins.create(adminsDetail, (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.send({ message: "Admin Created Succesfully" });
      }
    });
  }
});




// API Admin
// app.post("/admins/adminslogin", async (req, res) => {
//   const { email, password } = req.body;

//   const adminsDetail =  await admins.findOne({ email: email });

//   if (adminsDetail) {
//     if (await bcrypt.compare(password, adminsDetail.password)) {
//       res.send(adminsDetail);
//     } else {
//       res.send({ error: "invaild Password" });
//     }
//   } else {
//     res.send({ error: "Admin is not exist" });
//   }
// });

app.post("/admins/adminslogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminsDetail = await admins.findOne({ email });

    // If admin not found
    if (!adminsDetail) {
      return res.status(404).json({ error: "Admin does not exist" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, adminsDetail.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: adminsDetail._id, role: "admin" },
      process.env.JWT_SECRET || "yourSecretKey",  // fallback if env missing
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: adminsDetail._id,
        email: adminsDetail.email,
        name: adminsDetail.adminName,
      },
    });
  } catch (err) {
    console.error("Admin Login Error:", err); // log exact error
    res.status(500).json({ error: "Server error during admin login" });
  }
});


// API for PAYMENT

// app.post("/payment/create", async (req, res) => {
//   const total = req.body.amount;
//   console.log("Payment Request recieved for this ruppess", total);

//   const payment = await stripe.paymentIntents.create({
//     amount: total * 100,
//     currency: "inr",
//   });

//   res.status(201).send({
//     clientSecret: payment.client_secret,
//   });
// });

// 1️⃣ Create Order
// app.post("/payment/orders", async (req, res) => {
//   try {
//     const options = {
//       amount: req.body.amount * 100, // convert to paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error creating Razorpay order");
//   }
// });


// // 2️⃣ Verify Payment Signature
// app.post("/payment/verify", (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//   const sign = razorpay_order_id + "|" + razorpay_payment_id;
//   const expectedSign = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(sign.toString())
//     .digest("hex");

//   if (razorpay_signature === expectedSign) {
//     res.json({ success: true, message: "Payment verified successfully" });
//   } else {
//     res.status(400).json({ success: false, message: "Invalid signature" });
//   }
// });

// API TO add ORDER DETAILS

app.post("/orders/add", (req, res) => {
  const products = req.body.basket;
  const price = req.body.price;
  const email = req.body.email;
  const address = req.body.address;

  const orderDetail = {
    products: products,
    price: price,
    address: address,
    email: email,
  };

  Orders.create(orderDetail, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("order added to database >> ", result);
    }
  });
});

app.post("/orders/get", (req, res) => {
  const email = req.body.email;

  Orders.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      const userOrders = result.filter((order) => order.email === email);
      res.send(userOrders);
    }
  });
});

// Delete product by ID
app.delete("/products/delete/:id", async (req, res) => {
  try {
    const deletedProduct = await Products.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).send("Product not found");
    res.status(200).json({ message: "Product deleted", deletedProduct });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// GET product by ID
app.get("/products/update/:id", async (req, res) => {
  const Updateproducts = await Products.findById(req.params.id);
  if (Updateproducts) {
    res.json(Updateproducts);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});



app.post("/products/rate/:id", async (req, res) => {
  try {
    const { userId, rating } = req.body;

    const product = await Products.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user already rated
    const existingRating = product.ratings.find(
      (r) => r.userId === userId
    );

    if (existingRating) {
      existingRating.rating = rating;
    } else {
      product.ratings.push({ userId, rating });
    }

    // Calculate average
    const total = product.ratings.reduce((sum, r) => sum + r.rating, 0);
    product.averageRating = total / product.ratings.length;

    await product.save();

    res.json({ message: "Rating submitted", averageRating: product.averageRating });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting rating" });
  }
});

// app.put("/products/update/:id", upload.single("image"), async (req, res) => {
//   try {
//     const updatedData = {};

//     if (req.body.title !== undefined && req.body.title !== "")
//       updatedData.title = req.body.title;

//     if (req.body.description !== undefined && req.body.description !== "")
//       updatedData.description = req.body.description;

//     if (req.body.price !== undefined && req.body.price !== "")
//       updatedData.price = req.body.price;

//     if (req.body.gst !== undefined && req.body.gst !== "") {
//       updatedData.gst = Number(req.body.gst);
//     }

//     if (req.body.rating !== undefined && req.body.rating !== "")
//       updatedData.rating = req.body.rating;

//     if (req.file) {
//       updatedData.imageURL = `/uploads/${req.file.filename}`;
//     }

//     console.log("Updated data:", updatedData);

//     const updatedProduct = await Products.findByIdAndUpdate(
//       req.params.id,
//       { $set: updatedData },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json({ message: "Product updated", product: updatedProduct });

//   } catch (err) {
//     console.error("Error updating product:", err);
//     res.status(500).json({ message: "Server error during update" });
//   }
// });

app.put("/products/update/:id", upload.single("image"), async (req, res) => {
  try {

    console.log("================================");
    console.log("UPDATE PRODUCT");
    console.log("Product ID:", req.params.id);
    console.log("Request Body:", req.body);
    console.log("File:", req.file);
    console.log("================================");
 
    // Find existing product
    const existingProduct = await Products.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    const updatedData = {};

    // TITLE
      // TITLE
    if (
      req.body.title !== undefined &&
      req.body.title !== ""
    ) {
      updatedData.title = req.body.title;
    }

    // DESCRIPTION
    if (
      req.body.description !== undefined &&
      req.body.description !== ""
    ) {
      updatedData.description = req.body.description;
    }

    // PRICE
    if (
      req.body.price !== undefined &&
      req.body.price !== ""
    ) {
      updatedData.price = Number(req.body.price);
    }

    // GST
    if (
      req.body.gst !== undefined &&
      req.body.gst !== ""
    ) {
      updatedData.gst = Number(req.body.gst);
    }

    // IMAGE
    if (req.file) {
      updatedData.imageURL =
        `/uploads/${req.file.filename}`;
    }

    // =========================================
    // GST CALCULATION
    // =========================================

    const finalPrice =
      updatedData.price !== undefined
        ? updatedData.price
        : Number(existingProduct.price);

    const finalGST =
      updatedData.gst !== undefined
        ? updatedData.gst
        : Number(existingProduct.gst);

    const gstAmount =
      (finalPrice * finalGST) / 100;

    const totalPrice =
      finalPrice + gstAmount;

    updatedData.gstAmount = gstAmount;
    updatedData.totalPrice = totalPrice;

    console.log("================================");
    console.log("DATA GOING TO MONGODB");
    console.log(updatedData);
    console.log("================================");
    
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatedData
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    console.log("Updated Product:", updatedProduct);

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (err) {

    console.error("UPDATE ERROR:", err);

    res.status(500).json({
      message: "Server error during update",
      error: err.message
    });

  }
});
// Enquiry POST route
app.post("/enquiry/post", async (req, res) => {
    console.log("Received data:", req.body);
  try {
    const newEnquiry = new enquiry(req.body);
    await newEnquiry.save();
    res.status(200).json({ message: "Enquiry submitted successfully" });
  } catch (err) {
   console.error("Error saving enquiry:", err); 
    res.status(500).json({ error: "Failed to save enquiry" });
  }
});

app.get("/enquiry/get", async (req, res) => {
  try {
    const allEnquiries = await enquiry.find().sort({ createdAt: -1 }); // optional: newest first
    res.status(200).json(allEnquiries);
  } catch (err) {
    console.error("Error fetching enquiries:", err);
    res.status(500).json({ error: "Failed to fetch enquiries" });
  }
});

// Get Enquiry Count
app.get("/enquiry/count", async (req, res) => {
  try {
    const count = await enquiry.countDocuments(); // <-- use your enquiry model
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Error fetching enquiries count" });
  }
});

// Get Orders Count
app.get("/orders/count", async (req, res) => {
  try {
    const count = await Orders.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders count" });
  }
});


app.get("/orders/all", async (req, res) => {
  try {
    const orders = await Orders.find().sort({ createdAt: -1 });  // fetch all orders
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.put("/orders/:id/payment-status", async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const updatedOrder = await Orders.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: "Failed to update payment status" });
  }
});
app.post("/orders/updateStatus", async (req, res) => {
  const { orderId, status } = req.body;
  try {
    await Orders.findByIdAndUpdate(orderId, { status }, { new: true });
    res.json({ success: true, message: "Order status updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// // Update product rating
// router.put("/products/rating/:id", async (req, res) => {
//   try {
//     const { rating } = req.body;
//     const product = await Products.findByIdAndUpdate(
//       req.params.id,
//       { rating },
//       { new: true }
//     );
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update rating", error: err });
//   }
// });


app.listen(port, () => console.log("listening on the port", port));
