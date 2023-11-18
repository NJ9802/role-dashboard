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

    case "delete_role": {
      return draft.filter((role) => role.id !== action.payload.roleId);
    }

    default:
      throw Error("Unknown action type: " + action.type);
  }
}
