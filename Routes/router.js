const express = require("express");

// Create router object express
const router = new express.Router();

const userController = require("../Controllers/userController");
const jwtMiddelware = require("../Middlewares/jwtMiddleware");
const projectController = require("../Controllers/projectController");
const multerConfig = require("../Middlewares/multerMiddleware");

// register API
router.post("/user/register", userController.register);

// login API
router.post("/user/login", userController.login);

// add project
router.post(
  "/project/add",
  jwtMiddelware,
  multerConfig.single("projectImage"),
  projectController.addProjects
);

// get user projects
router.get(
  "/user/all-projects",
  jwtMiddelware,
  projectController.allUserProjects
);

// get all projects
router.get("/projects/all", jwtMiddelware, projectController.getallProjects);

// get home projects
router.get("/projects/home-projects", projectController.getHomeProjects);

// export router
module.exports = router;
