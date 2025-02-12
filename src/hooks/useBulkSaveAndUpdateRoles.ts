import { ROLE_LIST_QUERY_KEY } from "@/constants/query-keys";
import roleService from "@/services/role.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkSaveAndUpdateRoles = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: roleService.bulkSaveAndUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROLE_LIST_QUERY_KEY] });
    },
  });
};
