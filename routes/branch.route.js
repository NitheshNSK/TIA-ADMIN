const router = require("express").Router();
const branchController = require("../controllers/branch.controller");
const passport = require("passport");

/* 🔐 JWT Auth Middleware */
const requireAuth = passport.authenticate("jwt", { session: false });

/* ---------------- CREATE ---------------- */
router.post("/", requireAuth, branchController.createBranch);

/* ---------------- READ ---------------- */
router.get("/", requireAuth, branchController.getAllBranches);
router.get("/:id", requireAuth, branchController.getBranchById);

/* ---------------- UPDATE ---------------- */
router.put("/:id", requireAuth, branchController.updateBranch);

/* ---------------- SOFT DELETE ---------------- */
router.delete("/:id", requireAuth, branchController.deleteBranch);

/* ---------------- BULK SOFT DELETE ---------------- */
router.delete("/", requireAuth, branchController.deleteManyBranch);

/* ---------------- RESTORE ---------------- */
router.patch("/:id/restore", requireAuth, branchController.restoreBranch);

/* ---------------- PERMANENT DELETE ---------------- */
router.delete(
    "/:id/permanent",
    requireAuth,
    branchController.permanentDeleteBranch
);

module.exports = router;
