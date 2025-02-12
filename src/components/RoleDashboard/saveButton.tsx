"use client";

import { useBulkSaveAndUpdateRoles } from "@/hooks/useBulkSaveAndUpdateRoles";
import { filterDeletedRolesIds } from "@/lib/filters";
import { arePermissionsChanged, areRolesChanged } from "@/lib/utils";
import React, { useCallback, useContext } from "react";
import { validate } from "uuid";
import { Button } from "../ui/button";
import { RolesConfigContext } from "./context/roleDashboardContext";

interface SaveButtonProps {}

const SaveButton: React.FC<SaveButtonProps> = ({}) => {
  const { mutate, isPending: isLoading } = useBulkSaveAndUpdateRoles();
  const { rolesState, initialRoles, allPermissionsState, initialPermissions } =
    useContext(RolesConfigContext);

  const handleSave = useCallback(() => {
    mutate({
      roles: rolesState.map((role) => {
        if (validate(role._id || "")) {
          const { _id, ...rest } = role;
          return rest;
        }

        return role;
      }),
      deleteRoles: filterDeletedRolesIds(rolesState, initialRoles) || [],
    });
  }, [rolesState, mutate, initialRoles]);

  const disabled =
    !areRolesChanged(initialRoles, rolesState) &&
    !arePermissionsChanged(initialPermissions, allPermissionsState);

  return (
    <Button
      className="transition duration-500"
      disabled={disabled}
      onClick={handleSave}
    >
      {isLoading ? "Loading..." : "Save"}
    </Button>
  );
};

export default SaveButton;
