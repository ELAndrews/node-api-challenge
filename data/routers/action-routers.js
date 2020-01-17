const express = require("express");
const router = express.Router();
const db = require("../dbConfig");
const actions = require("../helpers/actionModel");

router.get("/api/actions", (req, res) => {
  actions
    .get(req.body.id)
    .then(action => {
      if (action === null) {
        res.status(404).json(`There isn't an action with this id`);
      } else {
        res.status(200).json(action);
      }
    })
    .catch(error => {
      res.status(500).json(`There was an error collecting actions data`);
    });
});

router.post("/api/actions", (req, res) => {
  if (req.body.project_id && req.body.description && req.body.notes) {
    actions
      .insert(req.body)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  } else {
    res
      .status(400)
      .json(
        "Please provide the relevant project id, an action description and notes for your new action. *Notes can be an empty string"
      );
  }
});

router.delete("/", (req, res) => {});

router.put("/", (req, res) => {});

module.exports = router;
