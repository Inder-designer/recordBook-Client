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
import { recordValidation, recordInitialValues, type IRecordFormValues } from "@/formik/validations/record.validation";
import { Form, Formik } from "formik";
import { useRecordHandlers } from "../handlers/record.handlers";
import { IRecord } from "@/types/IRecord";

interface AddAndUpdateBookDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  record?: IRecord;
  trigger?: ReactNode;
}

export function AddAndUpdateBookDialog({ open, onOpenChange, record, trigger }: AddAndUpdateBookDialogProps) {
  const { isloading, handleSaveRecord } = useRecordHandlers()
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
            <Button size="sm">
              <BookPlus className="mr-1 h-4 w-4" />
              New Record Book
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {record ? "Update Record Book" : "Create Record Book"}
          </DialogTitle>
        </DialogHeader>
        <Formik<IRecordFormValues>
          key={record?._id ?? "create"}
          initialValues={recordInitialValues(record)}
          validationSchema={recordValidation}
          enableReinitialize
          onSubmit={(values) => {
            if (record) {
              handleSaveRecord({
                values,
                recordId: record._id,
                onSuccess: () => setDialogOpen(false),
              });
            } else {
              handleSaveRecord({
                values,
                onSuccess: () => setDialogOpen(false),
              });
            }
          }}
        >
          {() => (
            <Form>
              <div className="space-y-4">
                <FormikInput
                  label="Record Title"
                  name="title"
                  placeholder="e.g. House Expense, Salary"
                  disabled={isloading}
                  required
                />
                <FormikInput
                  label="Description"
                  name="description"
                  placeholder="e.g. House Expense, Salary"
                  disabled={isloading}
                />
              </div>
              <DialogFooter className="mt-5">
                <DialogClose asChild disabled={isloading}>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isloading}>
                  {isloading
                    ? record
                      ? "Updating..."
                      : "Creating..."
                    : record
                      ? "Update"
                      : "Create"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog >
  );
}