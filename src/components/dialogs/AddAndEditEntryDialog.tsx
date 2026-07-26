"use client";
import { useState, type ReactNode } from "react";
import { ArrowDownLeft, ArrowUpRight, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, Formik } from "formik";
import { createEntryValidation, entryInitialValues } from "@/formik/validations/entry.validation";
import { FormikInput } from "../CommanFields/FormikInput";
import { useEntryHandlers } from "../handlers/entry.handlers";
import { IEntry } from "@/types/IEntry";
import { calculateAmount, isCalculation } from "@/utils/calculateAmount";

interface Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  entry?: IEntry;
  recordId: string | undefined;
  type: "cashIn" | "cashOut";
  trigger?: ReactNode;
}

const options = [
  {
    label: "Cash",
    value: "cash"
  },
  {
    label: "Online",
    value: "online"
  },
]
export function AddAndEditEntryDialog({ open, onOpenChange, entry, recordId, type, trigger }: Props) {
  const [entryType, setEntryType] = useState(entry?.type || type)
  const { handleSaveEntry, isLoading } = useEntryHandlers()
  const [action, setAction] = useState<"save" | "saveAndNew">("save");
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined;

  const dialogOpen = isControlled ? open : internalOpen;

  const setDialogOpen = (value: boolean) => {
    if (isControlled) {
      onOpenChange?.(value);
    } else {
      setInternalOpen(value);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
          {trigger ?? (
            <Button size="sm" variant={entryType === "cashIn" ? "default" : "destructive"}>
              {entryType === "cashIn" ?
                <Plus className="h-4 w-4" /> :
                <Minus className="h-4 w-4" />
              }

              {entryType === "cashIn" ? "Cash In" : "Cash Out"}
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{entry ? "Edit" : "Add"}{" "}  <span>{entryType === "cashIn" ? "Cash In" : "Cash Out"}</span> Entry</DialogTitle>
        </DialogHeader>
        <div>
          <Formik key={entry?._id ?? type}
            initialValues={entryInitialValues(type, entry)}
            validationSchema={createEntryValidation}
            enableReinitialize
            onSubmit={(values, { resetForm }) => {
              if (!recordId) return;
              const calculatedAmount = calculateAmount(values.amount);
              console.log("🚀 ~ AddAndEditEntryDialog ~ calculatedAmount:", calculatedAmount)

              if (calculatedAmount === "Invalid calculation") {
                return;
              }

              const payload = {
                ...values,
                amount: calculatedAmount,
              };

              const onSuccess = () => {
                if (action === "save") {
                  setDialogOpen(false);
                } else {
                  resetForm({
                    values: {
                      ...entryInitialValues(values.type),
                      transactionDate: values.transactionDate,
                    },
                  });
                }
              };

              if (entry) {
                handleSaveEntry({ values: payload, recordId, entryId: entry._id, onSuccess });
              } else {
                handleSaveEntry({ values: payload, recordId, onSuccess });
              }
            }}
          >
            {({ values, dirty, setFieldValue }) => (
              <Form>
                <div className="space-y-4">
                  <div className="space-y-2">
                    {/* <Label>Type</Label> */}
                    <div className="flex gap-2">
                      <div
                        onClick={() => { setEntryType("cashIn"), setFieldValue("type", "cashIn") }}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${values.type === "cashIn"
                          ? "border-income bg-income-bg text-income"
                          : "border-input bg-background text-muted-foreground hover:bg-accent"
                          }`}
                      >
                        <ArrowDownLeft className="h-4 w-4" />
                        Cash In
                      </div>
                      <div
                        onClick={() => { setEntryType("cashOut"), setFieldValue("type", "cashOut") }}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${values.type === "cashOut"
                          ? "border-expense bg-expense-bg text-expense"
                          : "border-input bg-background text-muted-foreground hover:bg-accent"
                          }`}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                        Cash Out
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <FormikInput
                      label="Date"
                      type="date"
                      name="transactionDate"
                    />
                  </div>
                  <div className="space-y-2">
                    <FormikInput
                      label="Amount"
                      // type="number"
                      name="amount"
                      required
                    />
                    {values.amount && isCalculation(values.amount) && (
                      <div className="text-sm text-muted-foreground">
                        Result: <span className="font-medium">{calculateAmount(values.amount)}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <FormikInput
                      label="Remark"
                      name="remark"
                      placeholder="e.g. Office supplies"
                    />
                  </div>
                  <div className="space-y-2">
                    <FormikInput
                      label="Category"
                      name="category"
                      placeholder="e.g. Office supplies"
                    />
                  </div>
                  <div className="space-y-2">
                    <FormikInput
                      label="Payment Mode"
                      type="select"
                      name="paymentMethod"
                      placeholder="e.g. Office supplies"
                      options={options}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <div className="mt-4 flex gap-3">
                    {!entry && (
                      <Button
                        type="submit"
                        variant="outline"
                        onClick={() => setAction("saveAndNew")}
                        disabled={isLoading}
                      >
                        Save & Add New
                      </Button>
                    )}
                    <Button
                      type="submit"
                      onClick={() => setAction("save")}
                      disabled={(entry && !dirty) || isLoading}
                    >
                      {isLoading
                        ? entry
                          ? "Updating..."
                          : "Saving..."
                        : entry
                          ? "Update"
                          : "Save"}
                    </Button>
                  </div>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog >
  );
}