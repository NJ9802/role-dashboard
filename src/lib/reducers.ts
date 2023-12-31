import { Role } from "@/types/role";
import { v4 as uuidv4 } from "uuid";

export interface Action {
  type: string;
  payload: { [key: string]: any };
}

export function rolesReducer(draft: Role[], action: Action) {
  switch (action.type) {
    case "change_all_permissions": {
      const { checked, permission } = action.payload;

      if (checked) {
        draft.forEach(
          (role) =>
            (role.permissions = Array.from(
              new Set([...role.permissions, permission]),
            )),
        );
      } else {
        draft.forEach(
          (role) =>
            (role.permissions = role.permissions.filter(
              (item) => item !== permission,
            )),
        );
      }

      break;
    }

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

    case "update_role_permission": {
      const { permission, roleId } = action.payload;

      const role = draft.filter((item) => item.id === roleId)[0];

      if (role.permissions.includes(permission)) {
        role.permissions = role.permissions.filter(
          (item) => item !== permission,
        );
      } else {
        role.permissions.push(permission);
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

    case "add_new_role": {
      const { allPermissions, newRoleName } = action.payload;
      const readPermissions: string[] = allPermissions.filter(
        (permission: string) => permission.split(":")[1].match("READ"),
      );

      draft.push({
        id: uuidv4(),
        name: newRoleName,
        permissions: readPermissions,
      });
      break;
    }

    case "delete_entity_permissions": {
      draft.forEach((role) => {
        role.permissions = role.permissions.filter(
          (item) => item.split(":")[0] !== action.payload.entity,
        );
      });
      break;
    }

    case "delete_permission": {
      draft.forEach((role) => {
        role.permissions = role.permissions.filter(
          (item) => item !== action.payload.permission,
        );
      });
      break;
    }

    case "delete_role": {
      return draft.filter((role) => role.id !== action.payload.roleId);
    }

    default:
      throw Error("Unknown action type: " + action.type);
  }
}
