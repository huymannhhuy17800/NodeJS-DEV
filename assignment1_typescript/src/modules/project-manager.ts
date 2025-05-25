import { Role } from "./role";
import { Project } from "./project";
import { User } from "./user";

export class ProjectManager {
  projects: Project[];
  // members: User[];
  constructor() {
    this.projects = [];
    // this.members = [];
  }

  addProject(project: Project): Project {
    const newProject: Project = { ...project };
    this.projects.push(newProject);
    return newProject;
  }

  removeProject(pjId: number) {
    const foundPj = this.projects.find((project) => project.id === pjId);

    if (foundPj !== undefined) {
      const pjIndex = this.projects.indexOf(foundPj);
      //remove project at index = foundPj, and 1 item splice("index of desire item to remove", "number of item to remove")
      this.projects.splice(pjIndex, 1);
    } else {
      console.log("The project with id: " + pjId + " is not found");
    }
  }

  addUserToProject(pjId: number, newMember: User) {
    const foundPj = this.projects.find((project) => project.id === pjId);
    if (foundPj !== undefined) {
      // Find existing user in the project by id
      const foundMem = this.findUserExistedInProject(foundPj, newMember);
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
  }

  listProjects() {
    // return console.log(this.findById(this.projects, 1));
    return this.projects.map((item) => {
      console.log(item);
    });
  }

  findById<T extends Project | User>(items: T[], id: number) {
    return items.find((item) => item.id === id);
  }

  findUserExistedInProject(
    foundPj: Project,
    newMember: User
  ): User | undefined {
    let foundMember = foundPj.members.find(
      (member) => newMember.id === member.id
    );
    return foundMember;
  }

  isAdmin(user: User): user is User {
    if ((user as User).role === Role.ADMIN) {
      return true;
    } else {
      return false;
    }
  }
}
