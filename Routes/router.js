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
// multer works only when the reqheader is app/json
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

// edit project
router.put(
  // ":" to get id in the url path
  "/projects/edit/:id",
  jwtMiddelware,
  multerConfig.single("projectImage"),
  projectController.editProjectController
);

// delete project
router.delete(
  "/projects/remove/:id",
  jwtMiddelware,
  projectController.deleteProjectController
);

// update user
router.put(
  "/user/edit",
  jwtMiddelware,
  multerConfig.single("profileImage"),
  userController.editUser
);

// export router
module.exports = router;
