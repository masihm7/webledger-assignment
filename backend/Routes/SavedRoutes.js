const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
router.post("/", async (req, res) => {
  try {
    let { userId, recipeId, title, image } = req.body;

    if (!userId || !recipeId) {
      return res.status(400).json({ error: "error" });
    }
    const lastRecipe = await prisma.savedRecipe.findFirst({
      where: { userId },
      orderBy: { order: "desc" },
    });
    const newOrder = lastRecipe ? lastRecipe.order + 1 : 1;
    recipeId = String(recipeId);
    const savedRecipe = await prisma.savedRecipe.create({
      data: {
        userId,
        recipeId,
        title,
        image,
        order: newOrder,
      },
    });
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error" });
  }
});


router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const savedRecipes = await prisma.savedRecipe.findMany({
      where: { userId: parseInt(userId) },
    });

    res.status(200).json(savedRecipes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await prisma.savedRecipe.delete({
      where: {
        userId_recipeId: {
          userId: parseInt(userId),
          recipeId: recipeId,
        },
      },
    });

    res.status(200).json({ message: "delete success" });
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
});

router.put("/update", async (req, res) => {
  const { userId, orderedRecipes } = req.body;
  try {
    const updates = orderedRecipes.map(({ recipeId, order }) =>
      prisma.savedRecipe.updateMany({
        where: { userId, recipeId },
        data: { order },
      })
    );
    await Promise.all(updates);
    res.json({ message: "update success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error" });
  }
})

module.exports = router;
