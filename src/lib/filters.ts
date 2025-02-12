import { Role } from "@/types/role";
import { validate } from "uuid";

export const filterNewRoles = (rolesState: Role[]) =>
  rolesState.filter((role) => validate(role._id || ""));

export const filterUpdatedRoles = (rolesState: Role[], initialRoles: Role[]) =>
  rolesState
    .filter((role) => !validate(role._id || ""))
    .filter(
      (role) =>
        JSON.stringify(role) !==
        JSON.stringify(initialRoles.filter((item) => item._id === role._id)[0]),
    );

export const filterDeletedRolesIds = (
  rolesState: Role[],
  initialRoles: Role[],
) =>
  initialRoles
    .filter((role) => !rolesState.map((item) => item._id).includes(role._id))
    .map((role) => role._id);
