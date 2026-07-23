import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IMember } from "@/types/IRecord";

interface MemberMenuProps {
    member: IMember;
    onChangeRole: (member: IMember) => void;
    onRemove: (member: IMember) => void;
}

export default function MemberMenu({
    member,
    onChangeRole,
    onRemove,
}: MemberMenuProps) {

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="rounded-md p-1 hover:bg-muted"
                >
                    <EllipsisVertical className="h-5 w-5" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                    onClick={() => onChangeRole(member)}
                >
                    Change role
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => onRemove(member)}
                >
                    Remove
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}