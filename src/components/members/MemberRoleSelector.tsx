"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { MEMBER_ROLE_LABEL } from "@/utils/common";

interface MemberRoleSelectorProps {
  role: number;
  onChange: (role: number) => void;
}

const roles = [3, 4, 2];

const roleInfo = [
  {
    role: 2,
    permissions: [
      "Full access to book settings",
      "Manage member roles",
      "View activity log",
    ],
    restrictions: [
      "Can't remove owner",
      "Can't delete book",
    ],
  },
  {
    role: 3,
    permissions: [
      "Add Cash In / Cash Out",
      "View all entries",
      "Download reports",
    ],
    restrictions: [
      "Cannot edit or delete entries",
    ],
  },
  {
    role: 4,
    permissions: [
      "View entries",
      "View reports",
    ],
    restrictions: [],
  },
];

export default function MemberRoleSelector({
  role,
  onChange,
}: MemberRoleSelectorProps) {
  const selectedRole = roleInfo.find(
    (item) => item.role === role
  );

  return (
    <div className="border rounded">
      <div className="border-b p-3 font-medium">
        Choose Role
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-3">
          {roles.map((item) => (
            <Button
              key={item}
              type="button"
              variant={
                role === item
                  ? "default"
                  : "outline"
              }
              onClick={() => onChange(item)}
            >
              {
                MEMBER_ROLE_LABEL[
                  item as keyof typeof MEMBER_ROLE_LABEL
                ]
              }
            </Button>
          ))}
        </div>

        <div className="mt-5">
          <h4 className="font-medium mb-2">
            Permissions
          </h4>

          <ul className="list-disc pl-5 space-y-1">
            {selectedRole?.permissions.map(
              (permission) => (
                <li key={permission}>
                  {permission}
                </li>
              )
            )}
          </ul>

          {selectedRole?.restrictions.length ? (
            <>
              <h4 className="font-medium mt-5 mb-2">
                Restrictions
              </h4>

              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {selectedRole.restrictions.map(
                  (restriction) => (
                    <li key={restriction}>
                      {restriction}
                    </li>
                  )
                )}
              </ul>
            </>
          ) : null}

          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            You can change this later.
          </p>
        </div>
      </div>
    </div>
  );
}