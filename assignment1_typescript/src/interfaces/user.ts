export enum Role {
  ADMIN = "ADMIN",
  MNG = "MANAGER",
  DEV = "DEVELOPER",
}

export type Status = "ACTIVE" | "INACTIVE";

export interface User {
  id?: number;
  name?: string;
  email?: string;
  role?: Role;
  readonly status?: Status;
}

function describeUser(user: User) {
  return (
    "ID: " +
    user.id +
    "\nName: " +
    user.name +
    "\nEmail: " +
    user.email +
    "\nEmail: " +
    user.email +
    "\nRole: " +
    user.role +
    "\nStatus: " +
    user.status
  );
}
