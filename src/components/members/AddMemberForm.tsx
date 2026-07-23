import { addMemberValidation } from '@/formik/validations/record.validation';
import { Form, Formik, useFormikContext } from 'formik';
import { FormikInput } from '../CommanFields/FormikInput';
import { Button } from '../ui/button';
import { Check, UserPlus, X } from 'lucide-react';
import { useMemberSearch } from '@/hooks/useMemberSearch';
import Loader from '../Loader/Loader';
import { IMember } from '@/types/IRecord';
import { IUser } from '@/types/IUser';
import AddMemberFormFields from './AddMemberFormFields ';

interface AddMemberFormProps {
    members: IMember[];
    onNext: (user: IUser) => void;
}
export default function AddMemberForm({
    members,
    onNext,
}: AddMemberFormProps) {

    return (
        <div className="mb-4">
            <Formik
                initialValues={{ email: "" }}
                validationSchema={addMemberValidation}
                onSubmit={() => { }}
            >
                <AddMemberFormFields
                    members={members}
                    onNext={onNext}
                />
            </Formik>
        </div>
    )
}
