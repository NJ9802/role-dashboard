"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { RolesConfigContext } from "../context/roleDashboardContext";

interface NewPermissionFormProps {
  children: React.ReactNode;
  onSuccessfulSubmit: () => void;
}

const formSchema = z.object({
  newPermission: z
    .string()
    .regex(
      /^[A-Z_]+:[A-Z_]+$/,
      "The string must be in the format ENTITY:PERMISSION",
    ),
});

const NewPermissionForm: React.FC<NewPermissionFormProps> = ({
  children,
  onSuccessfulSubmit,
}) => {
  const { allPermissionsState, setAllPermissionsState } =
    useContext(RolesConfigContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPermission: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { newPermission } = values;
    setAllPermissionsState([...allPermissionsState, newPermission].sort());
    onSuccessfulSubmit();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="newPermission"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="py-4">
                  <Input placeholder="ENTITY:PERMISSION" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};

export default NewPermissionForm;
