import { IUser } from "@/types/IUser"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Badge } from "../ui/badge"
import { useState } from "react"
import { MEMBER_ROLE_LABEL } from "@/utils/common"
import { Info } from "lucide-react"
import { Button } from "../ui/button"
import { useRecordHandlers } from "../handlers/record.handlers"

const roles = [
    3, 4, 2
]

const roleInfo = [
    {
        role: 2,
        permissions: [
            "Full access to book settings & activity log",
            "Customize data operator permissions",
            "Change roles of data operator or viewer"
        ],
        restrictions: [
            "Can’t remove Owner",
            "Can’t delete book"
        ]
    },
    {
        role: 3,
        permissions: [
            "Add Cash In / Cash Out entries",
            "View entries by everyone",
            "View net balance & download PDF or Excel"
        ],
        restrictions: [
            "Cannot edit or delete entries"
        ]
    },
    {
        role: 4,
        permissions: [
            "View entries by everyone",
            "View net balance & download PDF or Excel",
        ],
        restrictions: [
        ]
    }
]
interface AddMemberProps {
    user?: IUser;
    recordId: string;
    onBack: () => void;
    onSuccess: () => void;
}

const AddMember = ({ user, recordId, onBack, onSuccess }: AddMemberProps) => {
    console.log("🚀 ~ AddMember ~ user:", user)
    const { handleAddMember, addMemberLoading } = useRecordHandlers()
    const [role, setRole] = useState<number>(3)
    const selectedRole = roleInfo.find((item) => item.role === role);
    const data = {
        memberId: user?._id,
        role: role
    }
    console.log("🚀 ~ AddMember ~ data:", data)
    return (
        <div>
            <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
                <div className="border rounded p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="bg-gray-400 text-white w-5 h-5 rounded-full flex items-center justify-center">{user?.initials}</span>
                        <div>
                            <p className="text-lg font-medium capitalize">{user?.fullName}</p>
                            <p className="">{user?.email}</p>
                        </div>
                    </div>
                    <Badge>
                        Record-Book User
                    </Badge>
                </div>
                <div className="min-h-96 mt-5">
                    <div className="border rounded">
                        <div className="p-3 border-b font-medium">Choose Role</div>
                        <div className="p-3">
                            <div className="flex items-center gap-3">
                                {roles.map((r) => (
                                    <button
                                        key={r}
                                        className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium bg-gray-200 border ${r === role ? "border-blue-600 text-blue-600" : "border-gray-200 text-gray-500"}`}
                                        onClick={() => setRole(r)}
                                    >
                                        {MEMBER_ROLE_LABEL[r as unknown as keyof typeof MEMBER_ROLE_LABEL]}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4">
                                <h6 className="font-medium mb-2">Permissions</h6>

                                <ul className="space-y-2 list-disc pl-5">
                                    {selectedRole?.permissions.map((permission) => (
                                        <li key={permission}>{permission}</li>
                                    ))}
                                </ul>
                                {selectedRole?.restrictions.length ? (
                                    <>
                                        <h6 className="font-medium mt-5 mb-2">
                                            Restrictions
                                        </h6>

                                        <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                                            {selectedRole.restrictions.map((restriction) => (
                                                <li key={restriction}>
                                                    {restriction}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <p className="text-sm opacity-60 flex items-center gap-1.5 mt-2"><Info className="w-4 h-4" /> You can change this role later</p>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={onBack}
                        disabled={addMemberLoading}
                    >
                        Change Email
                    </Button>
                    <Button
                        disabled={addMemberLoading}
                        onClick={() => handleAddMember(data, recordId, onSuccess)}
                    >
                        Add Member
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddMember
