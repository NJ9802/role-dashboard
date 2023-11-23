"use client";

import { useCheckboxState } from "@/hooks/useCheckboxState";
import { formatString, getEntityHeaderState } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import React, { useContext } from "react";
import { Checkbox } from "../ui/checkbox";
import { TableHead } from "../ui/table";
import { RolesConfigContext } from "./context/roleDashboardContext";

interface EntityHeaderProps {
  entity: string;
}

const EntityHeader: React.FC<EntityHeaderProps> = ({ entity }) => {
  const {
    rolesState,
    entitiesWithPermissions,
    changeAllEntityPermissions,
    deleteEntity,
  } = useContext(RolesConfigContext);

  const checked = useCheckboxState(
    getEntityHeaderState({
      entitiesWithPermissions,
      rolesState,
      entity,
    }),
  );

  return (
    <TableHead
      key={entity}
      className="group border px-0"
      colSpan={entitiesWithPermissions[entity].length}
    >
      <div className="flex items-center justify-center gap-3">
        <Checkbox
          checked={checked}
          className="dashboardHiddenAction"
          onCheckedChange={(checked) =>
            changeAllEntityPermissions(checked, entity)
          }
        />

        <span>{formatString(entity)}</span>

        <Trash2
          className="dashboardHiddenAction h-4 w-4 cursor-pointer"
          onClick={() => deleteEntity(entity)}
        />
      </div>
    </TableHead>
  );
};

const EntityColums: React.FC = ({}) => {
  const { entities } = useContext(RolesConfigContext);

  return (
    <>
      {entities.map((entity) => (
        <EntityHeader key={entity} entity={entity} />
      ))}
    </>
  );
};

export default EntityColums;
