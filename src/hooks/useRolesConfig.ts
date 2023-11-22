import { rolesReducer } from "@/lib/reducers";
import { parsePermissions } from "@/lib/utils";
import { Role } from "@/types/role";
import { useState } from "react";
import { useImmerReducer } from "use-immer";

const useRolesConfig = (initialRoles: Role[], initialPermissions: string[]) => {
  const [rolesState, dispatch] = useImmerReducer(rolesReducer, initialRoles);
  const [allPermissionsState, setAllPermissionsState] = useState(
    [...initialPermissions].sort(),
  );

  const entitiesWithPermissions = parsePermissions(allPermissionsState);

  const entities = Object.keys(entitiesWithPermissions);

  const addNewRole = (newRoleName: string) => {
    dispatch({
      type: "add_new_role",
      payload: { allPermissions: allPermissionsState, newRoleName },
    });
  };

  const changeAllEntityPermissions = (
    checked: boolean | string,
    entity: string,
  ) => {
    dispatch({
      type: "change_all_entity_permissions",
      payload: {
        entity,
        checked,
        allPermissions: allPermissionsState,
      },
    });
  };

  const deleteEntity = (entity: string) => {
    setAllPermissionsState([
      ...allPermissionsState.filter(
        (permission) => permission.split(":")[0] !== entity,
      ),
    ]);

    dispatch({
      type: "delete_entity_permissions",
      payload: { entity },
    });
  };

  const changeAllPermissions = (
    checked: boolean | string,
    permission: string,
  ) => {
    dispatch({
      type: "change_all_permissions",
      payload: {
        checked,
        permission,
      },
    });
  };

  const deletePermission = (permission: string) => {
    setAllPermissionsState([
      ...allPermissionsState.filter((item) => item !== permission),
    ]);

    dispatch({
      type: "delete_permission",
      payload: {
        permission,
      },
    });
  };

  const changeAllRolePermissions = (
    checked: boolean | string,
    roleId: string,
  ) => {
    dispatch({
      type: "change_all_role_permissions",
      payload: {
        roleId,
        checked,
        allPermissions: allPermissionsState,
      },
    });
  };

  const updateRolePermission = (roleId: string, permission: string) => {
    dispatch({
      type: "update_role_permission",
      payload: { roleId, permission },
    });
  };

  const deleteRole = (roleId: string) => {
    dispatch({
      type: "delete_role",
      payload: {
        roleId,
      },
    });
  };

  return {
    rolesState,
    initialRoles,
    allPermissionsState,
    initialPermissions,
    entities,
    entitiesWithPermissions,
    addNewRole,
    changeAllEntityPermissions,
    changeAllPermissions,
    changeAllRolePermissions,
    updateRolePermission,
    deleteEntity,
    deletePermission,
    deleteRole,
    setAllPermissionsState,
  };
};

export default useRolesConfig;
