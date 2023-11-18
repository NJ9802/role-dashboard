import { Role } from "@/types/role";

export interface Action {
  type: string;
  payload: { [key: string]: any };
}

export function rolesReducer(draft: Role[], action: Action) {
  switch (action.type) {
    case "change_all_role_permissions": {
      const { roleId, checked, allPermissions } = action.payload;

      const role = draft.filter((item) => item.id === roleId)[0];

      if (checked) {
        role.permissions = allPermissions;
      } else {
        role.permissions = [];
      }
      break;
    }

    case "change_all_entity_permissions": {
      const { checked, entity, allPermissions } = action.payload;

      const entityPermissions = allPermissions.filter(
        (permission: string) => permission.split(":")[0] === entity,
      );

      if (checked) {
        draft.forEach((role) => {
          role.permissions = Array.from(
            new Set([...role.permissions, ...entityPermissions]),
          );
        });
      } else {
        draft.forEach((role) => {
          role.permissions = role.permissions.filter(
            (item) => item.split(":")[0] !== entity,
          );
        });
      }
      break;
    }

    case "delete_role": {
      return draft.filter((role) => role.id !== action.payload.roleId);
    }

    default:
      throw Error("Unknown action type: " + action.type);
  }
}
