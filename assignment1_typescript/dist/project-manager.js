"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectManager = void 0;
var role_1 = require("../src/modules/role");
var ProjectManager = /** @class */ (function () {
  // members: User[];
  function ProjectManager() {
    this.projects = [];
    // this.members = [];
  }
  ProjectManager.prototype.addProject = function (project) {
    var newProject = __assign({}, project);
    this.projects.push(newProject);
    return newProject;
  };
  ProjectManager.prototype.removeProject = function (pjId) {
    var foundPj = this.projects.find(function (project) {
      return project.id === pjId;
    });
    if (foundPj !== undefined) {
      var pjIndex = this.projects.indexOf(foundPj);
      //remove project at index = foundPj, and 1 item splice("index of desire item to remove", "number of item to remove")
      this.projects.splice(pjIndex, 1);
    } else {
      console.log("The project with id: " + pjId + " is not found");
    }
  };
  ProjectManager.prototype.addUserToProject = function (pjId, newMember) {
    var foundPj = this.projects.find(function (project) {
      return project.id === pjId;
    });
    if (foundPj !== undefined) {
      // Find existing user in the project by id
      var foundMem = this.findUserExistedInProject(foundPj, newMember);
      if (foundMem === undefined) {
        foundPj.members.push(newMember);
      } else {
        console.log(
          "The member with id: " +
            newMember.id +
            " is already in the Project id: " +
            pjId
        );
      }
    } else {
      console.log("The project with id: " + pjId + " is not found");
    }
  };
  ProjectManager.prototype.listProjects = function () {
    // return console.log(this.findById(this.projects, 1));
    return this.projects.map(function (item) {
      console.log(item);
    });
  };
  ProjectManager.prototype.findById = function (items, id) {
    return items.find(function (item) {
      return item.id === id;
    });
  };
  ProjectManager.prototype.findUserExistedInProject = function (
    foundPj,
    newMember
  ) {
    var foundMember = foundPj.members.find(function (member) {
      return newMember.id === member.id;
    });
    return foundMember;
  };
  ProjectManager.prototype.isAdmin = function (user) {
    if (user.role === role_1.Role.ADMIN) {
      return true;
    } else {
      return false;
    }
  };
  return ProjectManager;
})();
exports.ProjectManager = ProjectManager;
