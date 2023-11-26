"use client";

import {
  filterDeletedRolesIds,
  filterNewRoles,
  filterUpdatedRoles,
} from "@/lib/filters";
import {
  createNewRoles,
  deleteRoles,
  updatePermissions,
  updateRoles,
} from "@/lib/services";
import {
  arePermissionsChanged,
  areRolesChanged,
  isPermissionsChanged,
} from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { RolesConfigContext } from "./context/roleDashboardContext";

interface SaveButtonProps {}

const SaveButton: React.FC<SaveButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { rolesState, initialRoles, allPermissionsState, initialPermissions } =
    useContext(RolesConfigContext);
  const router = useRouter();

  const handleSave = async () => {
    setIsLoading(true);
    const newRoles = filterNewRoles(rolesState);
    const updatedRoles = filterUpdatedRoles(rolesState, initialRoles);
    const deletedRolesIds = filterDeletedRolesIds(rolesState, initialRoles);

    try {
      const promises = [];
      if (newRoles.length !== 0) {
        promises.push(await createNewRoles(newRoles));
      }

      if (updatedRoles.length !== 0) {
        promises.push(await updateRoles(updatedRoles));
      }

      if (deletedRolesIds.length !== 0) {
        promises.push(await deleteRoles(deletedRolesIds));
      }

      if (isPermissionsChanged(allPermissionsState, initialPermissions)) {
        promises.push(await updatePermissions(allPermissionsState));
      }

      await Promise.all(promises);
      router.refresh();
    } catch (error) {
      console.log(error);
      //  Notify the user that an error occurred
    } finally {
      setIsLoading(false);
    }
  };

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
