const express = require("express");
const router = express.Router();
const eastbay = require("./eastbay");
const footlocker = require("./footlocker");
const getProductList = require("./eastbay").geProductsList;

/* GET eastbay - products. */
router.get("/eastbay/products/list", async (req, res, next) => {
  const contextObject = {};
  try {
    const result = await eastbay.getProductsList(contextObject);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/footlocker/products/list", async (req, res, next) => {
  const contextObject = {};
  try {
    const result = await footlocker.geProductsList(contextObject);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/dbtest", async (req, res, next) => {
  const contextObject = {};
  const admin = require("firebase-admin");
  const db = admin.firestore();

  try {
    let docRef = db.collection("users").doc("alovelace");

    let setAda = await docRef.set({
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
  } catch (e) {
    console.log(e);
  }

  db.collection("customers")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
      });
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });

  const eastbayResult = await eastbay.geProductsList();
  console.log(eastbayResult);

  console.log("done");
});
// export GOOGLE_APPLICATION_CREDENTIALS="D:\webDevelopment\shoes-ecommerce\shoes-backend\shoes-backend-9ab8349ac915.json";

module.exports = router;
