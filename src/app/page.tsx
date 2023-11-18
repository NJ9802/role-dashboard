import RoleDasboard from "@/components/RoleDashboard/RoleDashboard";
import { Role } from "@/types/role";

export default function Home() {
  const roles: Role[] = [
    {
      id: "1",
      name: "admin",
      permissions: [
        "PROJECT:WRITE",
        "PROJECT:READ",
        "STORE:READ",
        "STORE:WRITE",
        "ACCOUNT:READ_ACCESS",
        "PRODUCT:READ_ACCESS",
        "STOCK:READ_ACCESS",
        "STOCK:WRITE_ACCESS",

        "PRODUCT:WRITE_ACCESS",

        "ACCOUNT:WRITE_ACCESS",
      ],
    },
    {
      id: "2",
      name: "client",
      permissions: ["STORE:SELL_PRODUCT", "PROJECT:READ", "STORE:READ"],
    },
    {
      id: "3",
      name: "ceo",
      permissions: [
        "PROJECT:READ",
        "STORE:READ",
        "ACCOUNT:READ_ACCESS",
        "ACCOUNT:DELETE",
      ],
    },
  ];

  const allPermissions = [
    "PROJECT:READ",
    "PROJECT:WRITE",
    "PROJECT:DELETE",
    "STORE:READ",
    "STORE:WRITE",
    "STORE:SELL_PRODUCT",
    "STORE:DELETE",
    "ACCOUNT:READ_ACCESS",
    "ACCOUNT:WRITE_ACCESS",
    "ACCOUNT:DELETE",
    "PRODUCT:READ_ACCESS",
    "PRODUCT:WRITE_ACCESS",
    "PRODUCT:DELETE",
    "STOCK:READ_ACCESS",
    "STOCK:WRITE_ACCESS",
    "STOCK:DELETE",
  ];

  return (
    <main className="flex min-h-screen flex-col  items-center justify-between p-24">
      <RoleDasboard roles={roles} allPermissions={allPermissions} />
    </main>
  );
}
