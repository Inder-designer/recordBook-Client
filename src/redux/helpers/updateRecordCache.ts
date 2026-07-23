import { AppDispatch } from "@/redux/store/store";
import { RecordApi } from "@/redux/api/record";
import { IRecord } from "@/types/IRecord";

export const updateRecordCache = (
    dispatch: AppDispatch,
    recordId: string,
    updater: (draft: IRecord) => void
) => {
    return dispatch(
        RecordApi.util.updateQueryData(
            "getRecordById",
            recordId,
            (draft) => {
                if (!draft) return;

                updater(draft);
            }
        )
    );
};