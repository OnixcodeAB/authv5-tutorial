"use client";
import { FormSuccess } from "@/components/FormHandlers/Success/form-success";
import RoleGate from "@/components/auth/RoleGate/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { UserRole } from "@prisma/client";
import { admin } from "@/actions/admin";

export default function AdminPage() {
  const onActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route");
      } else {
        toast.error("Forbidden API");
      }
    });
  };
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="Private information for Administrator" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button type="button" onClick={onApiRouteClick}>
            Click To test
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button type="button" onClick={onActionClick}>
            Click To test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
