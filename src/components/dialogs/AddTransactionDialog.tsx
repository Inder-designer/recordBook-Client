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
// import { useCashBook, type TransactionType } from "@/hooks/use-cash-book";

interface Props {
  recordId: string | undefined;
  type: "cashIn" | "cashOut";
  trigger?: ReactNode;
}

export function AddTransactionDialog({ recordId, type, trigger }: Props) {
  const { handleCreateEntry, createEntryLoading } = useEntryHandlers()
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<"save" | "saveAndNew">("save");

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm">
            {type === "cashIn" ?
              <Plus className="mr-1 h-4 w-4" /> :
              <Minus className="mr-1 h-4 w-4" />
            }

            {type === "cashIn" ? "Cash In" : "Cash Out"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <div>
          <Formik
            initialValues={entryInitialValues(type)}
            validationSchema={createEntryValidation}
            enableReinitialize
            onSubmit={(values, { resetForm }) => {
              if (!recordId) return;
              handleCreateEntry(values, recordId, () => {
                if (action === "save") {
                  setIsOpen(false);
                } else {
                  resetForm({
                    values: {
                      ...entryInitialValues(values.type),
                      transactionDate: values.transactionDate,
                    },
                  });
                }
              })
            }
            }
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="space-y-4">
                  <div className="space-y-2">
                    {/* <Label>Type</Label> */}
                    <div className="flex gap-2">
                      <div
                        onClick={() => setFieldValue("type", "cashIn")}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${values.type === "cashIn"
                          ? "border-income bg-income-bg text-income"
                          : "border-input bg-background text-muted-foreground hover:bg-accent"
                          }`}
                      >
                        <ArrowDownLeft className="h-4 w-4" />
                        Cash In
                      </div>
                      <div
                        onClick={() => setFieldValue("type", "cashOut")}
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
                      type="number"
                      name="amount"
                      required
                    />
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
                <DialogFooter className="mt-4">
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={createEntryLoading}
                    onClick={() => setAction("saveAndNew")}
                  >
                    Save & Add New
                  </Button>
                  <Button
                    type="submit"
                    disabled={createEntryLoading}
                    onClick={() => setAction("save")}
                  >
                    {createEntryLoading ? "Saving..." : "Save"}
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog >
  );
}