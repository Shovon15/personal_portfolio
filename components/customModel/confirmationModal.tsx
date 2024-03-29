import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

interface Data {
    _id: string;
    name: string;
}
type DialogProp = {
    modalOpen: boolean;
    data: Data;
    description: string;
    onClose: () => void;
    successAction: (data: Data) => void;
};

const ConfirmationModal = ({ modalOpen, data, description, onClose, successAction }: DialogProp) => {
    return (
        <AlertDialog open={modalOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">{data?.name}</AlertDialogTitle>
                    <AlertDialogDescription className="text-destructive text-center py-10">{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} className="text-destructive border-destructive hover:text-destructive/80">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => successAction(data)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmationModal;
