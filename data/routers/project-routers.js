const express = require("express");
const router = express.Router();
const db = require("../dbConfig");
const projects = require("../helpers/projectModel");

router.get(`/api/projects`, (req, res) => {
  projects
    .get(req.body.id)
    .then(post => {
      if (post === null) {
        res.status(404).json(`There isn't a project with this id`);
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      res.status(500).json(`There was an error collecting data`);
    });
});

router.post("/api/projects", (req, res) => {
  if (req.body.name && req.body.description) {
    projects
      .insert(req.body)
      .then(post => {
        res.status(201).json(`The Post has bee successfully created.`);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  } else {
    res
      .status(400)
      .json("Please provide a name and a description for your new post");
  }
});

router.delete("/", (req, res) => {});

router.put("/", (req, res) => {});

module.exports = router;
