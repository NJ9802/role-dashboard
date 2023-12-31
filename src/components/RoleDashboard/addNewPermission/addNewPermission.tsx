"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TableHead } from "../../ui/table";
import NewPermissionForm from "./newPermissionForm";

interface AddNewPermissionProps {}

const AddNewPermission: React.FC<AddNewPermissionProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TableHead
        className="cursor-pointer rounded-tr-xl border bg-primary/40 text-center text-foreground transition-colors hover:bg-primary/20"
        rowSpan={2}
        onClick={() => setIsOpen(true)}
      >
        Add Permission
      </TableHead>

      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new permission</DialogTitle>
            <DialogDescription>
              Permission must have the following format:
            </DialogDescription>
          </DialogHeader>

          <NewPermissionForm onSuccessfulSubmit={() => setIsOpen(false)}>
            <DialogFooter>
              <Button type="submit">Ok</Button>
            </DialogFooter>
          </NewPermissionForm>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewPermission;
