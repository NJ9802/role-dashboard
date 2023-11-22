import { Role } from "@/types/role";
import { validate } from "uuid";

export const filterNewRoles = (rolesState: Role[]) =>
  rolesState.filter((role) => validate(role.id));

export const filterUpdatedRoles = (rolesState: Role[], initialRoles: Role[]) =>
  rolesState
    .filter((role) => !validate(role.id))
    .filter(
      (role) =>
        JSON.stringify(role) !==
        JSON.stringify(initialRoles.filter((item) => item.id === role.id)[0]),
    );

export const filterDeletedRolesIds = (
  rolesState: Role[],
  initialRoles: Role[],
) =>
  initialRoles
    .filter((role) => !rolesState.map((item) => item.id).includes(role.id))
    .map((role) => role.id);
