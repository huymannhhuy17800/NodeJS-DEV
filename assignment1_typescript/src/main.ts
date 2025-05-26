import { ProjectManager } from "./class/project-manager";
import { Role } from "./interfaces/user";

// create ProjectManager
const projectMng = new ProjectManager();

// Add vài projects
projectMng.addProject({
  id: 1,
  name: "Typescript for Beginner",
  optionalDescription: "Basic Typescript",
  members: [],
});

projectMng.addProject({
  id: 2,
  name: "NodeJS Developer",
  optionalDescription: "NodeJS with ExpressJS for back- end developer",
  members: [],
});

// projectMng.addProject(3, "How To Talk To People :(", "Get a life", []);

projectMng.listProjects();

// projectMng.removeProject(3);

// projectMng.listProjects();

projectMng.addUserToProject(1, {
  id: 1,
  name: "Manh Huy",
  email: "email@gmail.com",
  role: Role.DEV,
  status: "ACTIVE",
});

projectMng.addUserToProject(1, {
  id: 2,
  name: "Holly Molly",
  email: "holly@gmail.com",
  role: Role.DEV,
  status: "ACTIVE",
});

projectMng.addUserToProject(1, {
  id: 3,
  name: "Nguyen Manh Huy",
  email: "huy.manager@gmail.com",
  role: Role.MNG,
  status: "ACTIVE",
});

projectMng.addUserToProject(1, {
  id: 4,
  name: "Nguyen Manh Huy but ADMIN",
  email: "huy.admin@gmail.com",
  role: Role.ADMIN,
  status: "ACTIVE",
});

// Trying to add existing user in project
projectMng.addUserToProject(1, {
  id: 1,
  name: "Manh Huy",
  email: "email@gmail.com",
  role: Role.DEV,
  status: "ACTIVE",
});

projectMng.addUserToProject(1, {
  id: 1,
});

projectMng.addUserToProject(2, {
  id: 1,
});

// Add user to different project
projectMng.addUserToProject(2, {
  id: 1,
  name: "Manh Huy",
  email: "email@gmail.com",
  role: Role.DEV,
});

// Display all projects with members
console.log("======== Projects before remove ========");
projectMng.listProjects();

// Remove Project

projectMng.removeProject(2);

console.log("======== Remove Project Id 2 ========");

projectMng.listProjects();

// Test type guard
console.log(
  projectMng.isAdmin({
    name: "Clark Kent",
    email: "email@gmail.com",
    role: Role.ADMIN,
  })
);
