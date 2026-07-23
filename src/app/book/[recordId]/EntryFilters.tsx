"use client";

import { CalendarIcon, ChevronDownIcon, X } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { IMember } from "@/types/IRecord";
import { IEntryFilters } from "@/types/IEntry";
import { DateRange } from "react-day-picker";
import { presets } from "@/utils/common";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";


export interface EntryFiltersValue {
    type?: "cashIn" | "cashOut";
    paymentMethod?: "cash" | "bank" | "upi" | "card" | "cheque" | "online";
    member?: string;
    startDate?: Date;
    endDate?: Date;
}

interface Props {
    isFilter: boolean;
    filters: IEntryFilters;
    members: IMember[];
    onChange: (filters: Partial<IEntryFilters>) => void;
}

const paymentMethods = [
    "cash",
    "bank",
    "upi",
    "card",
    "cheque",
    "online",
] as const;

export default function EntryFilters({
    isFilter,
    filters,
    members,
    onChange,
}: Props) {
    const [open, setOpen] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [date, setDate] = useState<{
        startDate?: string;
        endDate?: string;
    }>({
        startDate: filters.startDate,
        endDate: filters.endDate,
    });
    useEffect(() => {
        if (calendarOpen) {
            setDate({
                startDate: filters.startDate,
                endDate: filters.endDate,
            });
        }
    }, [calendarOpen, filters.startDate, filters.endDate]);
    return (
        <div className="mb-6 px-4">
            <div className="flex flex-wrap gap-4">
                {/* Entry Type */}
                <div className="space-y-2">
                    <Select
                        value={filters.type ?? "all"}
                        onValueChange={(value) =>
                            onChange({
                                type:
                                    value === "all"
                                        ? undefined
                                        : (value as IEntryFilters["type"]),
                            })
                        }

                    >
                        <SelectTrigger className="text-primary/80 rounded bg-white">
                            Types: <SelectValue placeholder="All" />
                        </SelectTrigger>

                        <SelectContent position="popper">
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="cashIn">
                                Cash In
                            </SelectItem>
                            <SelectItem value="cashOut">
                                Cash Out
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                    <Select
                        value={filters.paymentMethod ?? "all"}
                        onValueChange={(value) =>
                            onChange({
                                paymentMethod:
                                    value === "all"
                                        ? undefined
                                        : (value as IEntryFilters["paymentMethod"]),
                            })
                        }
                    >
                        <SelectTrigger className="text-primary/80 rounded bg-white">
                            Payment modes: <SelectValue placeholder="All" />
                        </SelectTrigger>

                        <SelectContent position="popper">
                            <SelectItem value="all">
                                All
                            </SelectItem>

                            {paymentMethods.map((method) => (
                                <SelectItem
                                    key={method}
                                    value={method}
                                >
                                    {method.toUpperCase()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Member */}
                <div className="space-y-2">
                    <Select
                        value={filters.member ?? "all"}
                        onValueChange={(value) =>
                            onChange({
                                member: value === "all" ? undefined : value,
                            })
                        }
                    >
                        <SelectTrigger className="text-primary/80 rounded bg-white">
                            Members: <SelectValue placeholder="All" />
                        </SelectTrigger>

                        <SelectContent position="popper">
                            <SelectItem value="all">
                                All
                            </SelectItem>

                            {members.map((member) => (
                                <SelectItem
                                    key={member.user._id}
                                    value={member.user._id}
                                >
                                    {member.user.fullName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal h-8 rounded border border-input shadow-none text-primary/80! p-2! pl-2.5!"
                            >
                                {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}

                                Duration: {filters.startDate && filters.endDate
                                    ? `${format(new Date(filters.startDate), "dd MMM yyyy")} - ${format(
                                        new Date(filters.endDate),
                                        "dd MMM yyyy"
                                    )}`
                                    : "All Time"} <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                            <div className="flex">
                                <div className="flex w-44 flex-col gap-2 border-r p-3">
                                    {presets.map((preset) => (
                                        <Button
                                            key={preset.label}
                                            variant="ghost"
                                            className="justify-start"
                                            onClick={() => {
                                                if ("custom" in preset) {
                                                    setOpen(false);
                                                    setCalendarOpen(true);
                                                    return;
                                                }

                                                const range = preset.getRange();

                                                onChange({
                                                    startDate: range.from?.toISOString(),
                                                    endDate: range.to?.toISOString(),
                                                });

                                                setOpen(false);
                                            }}
                                        >
                                            {preset.label}
                                        </Button>
                                    ))}

                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            onChange({
                                                startDate: undefined,
                                                endDate: undefined,
                                            });
                                            setCalendarOpen(false)
                                        }
                                        }
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Dialog open={calendarOpen} onOpenChange={setCalendarOpen}>
                        <DialogContent className="max-w-3xl">
                            <DialogHeader>
                                <DialogTitle>Select Date Range</DialogTitle>
                            </DialogHeader>

                            <Calendar
                                mode="range"
                                numberOfMonths={2}
                                defaultMonth={
                                    date.startDate
                                        ? new Date(date.startDate)
                                        : new Date()
                                }
                                selected={{
                                    from: date.startDate
                                        ? new Date(date.startDate)
                                        : undefined,
                                    to: date.endDate
                                        ? new Date(date.endDate)
                                        : undefined,
                                }}
                                onSelect={(range) => {
                                    setDate({
                                        startDate: range?.from?.toISOString(),
                                        endDate: range?.to?.toISOString(),
                                    });
                                }}
                            />

                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setCalendarOpen(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    onClick={() => {
                                        onChange({
                                            startDate: date.startDate,
                                            endDate: date.endDate,
                                        });

                                        setCalendarOpen(false);
                                    }}
                                >
                                    Apply
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                {isFilter &&
                    <button
                        className="flex items-center gap-1 font-medium border border-input h-8 px-2 rounded text-primary/80 cursor-pointer text-sm hover:bg-primary hover:text-white transition-all duration-300"
                        onClick={() =>
                            onChange({
                                type: undefined,
                                paymentMethod: undefined,
                                member: undefined,
                                startDate: undefined,
                                endDate: undefined,
                            })
                        }
                    >
                        <X className="h-5 w-5" />
                        Clear All
                    </button>
                }
            </div>

        </div>
    );
}