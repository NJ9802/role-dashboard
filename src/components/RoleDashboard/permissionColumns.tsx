"use client";

import { useCheckboxState } from "@/hooks/useCheckboxState";
import {
  formatPermission,
  formatString,
  getPermissionHeaderState,
} from "@/lib/utils";
import { Trash2 } from "lucide-react";
import React, { useContext } from "react";
import { Checkbox } from "../ui/checkbox";
import { TableHead } from "../ui/table";
import { RolesConfigContext } from "./context/roleDashboardContext";

interface PermissionHeader {
  entity: string;
  permission: string;
}

const PermissionHeader: React.FC<PermissionHeader> = ({
  entity,
  permission,
}) => {
  const { rolesState, changeAllPermissions, deletePermission } =
    useContext(RolesConfigContext);

  const checked = useCheckboxState(
    getPermissionHeaderState(
      rolesState,
      formatPermission({ entity, permission }),
    ),
  );

  return (
    <TableHead key={permission} className="group border px-0 text-center">
      <div className="mx-4 flex items-center justify-center gap-3">
        <Checkbox
          checked={checked}
          className="dashboardHiddenAction"
          onCheckedChange={(checked) => {
            changeAllPermissions(
              checked,
              formatPermission({ entity, permission }),
            );
          }}
        />

        <span>{formatString(permission)}</span>

        <Trash2
          className="dashboardHiddenAction h-4 w-4 shrink-0 cursor-pointer"
          onClick={() =>
            deletePermission(formatPermission({ entity, permission }))
          }
        />
      </div>
    </TableHead>
  );
};

const PermissionColumns: React.FC = ({}) => {
  const { entities, entitiesWithPermissions } = useContext(RolesConfigContext);

  return (
    <>
      {entities.map((entity) => {
        return entitiesWithPermissions[entity].map((permission) => (
          <PermissionHeader
            key={permission}
            entity={entity}
            permission={permission}
          />
        ));
      })}
    </>
  );
};

export default PermissionColumns;
