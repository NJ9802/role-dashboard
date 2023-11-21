import { rolesReducer } from "@/lib/reducers";
import { parsePermissions } from "@/lib/utils";
import { Role } from "@/types/role";
import { useState } from "react";
import { useImmerReducer } from "use-immer";

const useRolesConfig = (roles: Role[], allPermissions: string[]) => {
  const [rolesState, dispatch] = useImmerReducer(rolesReducer, roles);
  const [allPermissionsState, setAllPermissionsState] = useState(
    [...allPermissions].sort(),
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
    allPermissionsState,
    entities,
    entitiesWithPermissions,
    addNewRole,
    changeAllEntityPermissions,
    changeAllPermissions,
    changeAllRolePermissions,
    deleteEntity,
    deletePermission,
    deleteRole,
    setAllPermissionsState,
  };
};

export default useRolesConfig;
