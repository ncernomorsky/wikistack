const express = require("express");
const router = express.Router();

const { addPage } = require("../views");

const { Page } = require("../models");

// function generateSlug (title) {
//     // Removes all non-alphanumeric characters from title
//     // And make whitespace underscore
//     return title.replace(/\s+/g, '_').replace(/\W/g, '');
// }

router.get("/", (req, res, next) => {
  res.send("got to GET /wiki/");
});

router.post("/", async (req, res, next) => {
  //console.log('TEST1>>>>>>>>>>>>>', req.body.name);
  //res.send('got to POST /wiki/');

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    slug: req.body.slug,
    status: req.body.status,
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  //console.log('TEST2>>>>>>>>>>>>>', req.body);
  res.send(addPage());
});

module.exports = router;
