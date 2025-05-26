import { Project } from "../interfaces/project";
import { User } from "../interfaces/user";
import { Role } from "../interfaces/user";
import { Notification, Log } from "./notification";

export class ProjectManager {
  private projects: Project[];
  private notifier: Notification;
  // members: User[];
  constructor() {
    this.projects = [];
    this.notifier = new Notification();
    // this.members = [];
  }

  addProject(project: Project): Project {
    const newProject: Project = { ...project };
    this.projects.push(newProject);
    this.notifier.notify(this.addProject.name, Log.INFO);
    return newProject;
  }

  removeProject(pjId: number) {
    const foundPj = this.projects.find((project) => project.id === pjId);

    if (foundPj !== undefined) {
      const pjIndex = this.projects.indexOf(foundPj);
      //remove project at index = foundPj, and 1 item splice("index of desire item to remove", "number of item to remove")
      this.projects.splice(pjIndex, 1);
      this.notifier.notify(this.removeProject.name, Log.INFO);
    } else {
      this.notifier.notify(this.removeProject.name, Log.ERROR);
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
        this.notifier.notify(this.addUserToProject.name, Log.ERROR);
        console.log(
          "The member with id: " +
            newMember.id +
            " is already in the Project id: " +
            pjId
        );
      }
    } else {
      this.notifier.notify(this.addUserToProject.name, Log.ERROR);
      console.log("The project with id: " + pjId + " is not found");
    }
  }

  listProjects() {
    // return console.log(this.findById(this.projects, 1));
    this.notifier.notify(this.listProjects.name, Log.INFO);
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

  isAdmin(user: User): user is User & { role: Role.ADMIN } {
    return user.role === Role.ADMIN;
  }
}
