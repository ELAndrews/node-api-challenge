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

router.delete("/api/actions/:id", (req, res) => {
  actions
    .remove(req.params.id)
    .then(code => {
      if (code === 1) {
        res.status(202).json(`The action has been successfully deleted`);
      } else {
        res.status(404).json(`There isn't a action with this id`);
      }
    })
    .catch(error => {
      res.status(500).json(`There was an error deleting this action`);
    });
});

router.put("/api/actions", (req, res) => {
  if (
    req.body.id &&
    req.body.project_id &&
    req.body.description &&
    req.body.notes &&
    req.body.completed
  ) {
    actions
      .get(req.body.id)
      .then(action => {
        if (action === null) {
          res.status(404).json(`There isn't an action with this id`);
        } else {
          actions
            .update(req.body.id, req.body)
            .then(action => {
              res.status(200).json(action);
            })
            .catch(error => {
              res.status(500).json(`There was an error updating this action`);
            });
        }
      })
      .catch(error => {
        res.status(500).json(`There was an error collecting actions data`);
      });
  } else {
    res
      .status(400)
      .json(
        "Please provide a project id, and the changes, including: a description, notes, and completed status for your action"
      );
  }
});

module.exports = router;
