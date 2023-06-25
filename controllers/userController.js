const express = require("express");
const { Wizard } = require("./models/Wizard");
const { Spell } = require("./models/Spell");

const router = express.Router();

router.get("/", async (req, res) => {
  let wizard = await Wizard.findAll(req.params.id, {
    include: {
      model: Spell,
      as: "spells",
    },
  });
  res.send(wizard);
});

router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  let wizard = await Wizard.findByPk(req.params.id, {
    include: {
      model: Spell,
      as: "spells",
    },
  });
  res.send(wizard);
});

// Add other user-related routes here

module.exports = router;
