"use client";

import clsx from "clsx";
import { Plus } from "lucide-react";
import React, { useContext, useState } from "react";
import { Input } from "../ui/input";
import { TableCell, TableFooter, TableRow } from "../ui/table";
import { RolesConfigContext } from "./context/roleDashboardContext";

interface AddNewRoleProps {}

const AddNewRole: React.FC<AddNewRoleProps> = ({}) => {
  const [newRoleName, setNewRoleName] = useState("");
  const { addNewRole, allPermissionsState } = useContext(RolesConfigContext);

  const handleNewRoleCreation = () => {
    if (newRoleName) {
      setNewRoleName("");
      addNewRole(newRoleName);
    }
  };

  return (
    <TableFooter>
      <TableRow>
        <TableCell className="sticky left-0 z-10 rounded-bl-xl border bg-white transition-colors group-hover:bg-muted/50">
          <Input
            className="w-28 border-none transition-colors focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Type Name"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
          />
        </TableCell>

        <TableCell
          onClick={handleNewRoleCreation}
          className={clsx(
            "border text-center",
            newRoleName
              ? "cursor-pointer bg-primary/40 hover:bg-primary/20"
              : "opacity-50",
          )}
          colSpan={allPermissionsState.length}
        >
          <div className="flex items-center justify-center gap-2">
            <Plus
              className={clsx(
                "h-4 w-4 transition",
                newRoleName ? "text-foreground" : "text-slate-400",
              )}
              strokeWidth={3.5}
            />
            <span
              className={clsx(
                "font-bold transition",
                newRoleName ? "text-foreground" : "text-slate-400",
              )}
            >
              Add Role
            </span>
          </div>
        </TableCell>

        {allPermissionsState.length !== 0 && (
          <TableCell className="rounded-br-xl border bg-border"></TableCell>
        )}
      </TableRow>
    </TableFooter>
  );
};

export default AddNewRole;
