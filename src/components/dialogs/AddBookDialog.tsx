import { useState, type ReactNode } from "react";
import { BookPlus } from "lucide-react";
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
import { FormikInput } from "../CommanFields/FormikInput";
import { createRecordValidation, recordInitialValues, type IRecordFormValues } from "@/formik/validations/record.validation";
import { Form, Formik } from "formik";
import { useRecordHandlers } from "../handlers/record.handlers";

export function AddBookDialog({ trigger }: { trigger?: ReactNode }) {
  const { createRecordLoading, handleCreateRecord } = useRecordHandlers()
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm">
            <BookPlus className="mr-1 h-4 w-4" />
            New Record Book
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Record Book</DialogTitle>
        </DialogHeader>
        <Formik<IRecordFormValues>
          initialValues={recordInitialValues}
          validationSchema={createRecordValidation}
          enableReinitialize
          onSubmit={(values) => handleCreateRecord(values, () => { setIsOpen(false) })}
        >
          {() => (
            <Form>
              <div className="space-y-4">
                <FormikInput
                  label="Record Title"
                  name="title"
                  placeholder="e.g. House Expense, Salary"
                  required
                />
                <FormikInput
                  label="Description"
                  name="description"
                  placeholder="e.g. House Expense, Salary"
                />
              </div>
              <DialogFooter className="mt-5">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">
                  Create
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog >
  );
}