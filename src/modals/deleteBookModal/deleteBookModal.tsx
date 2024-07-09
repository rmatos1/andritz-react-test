import { useAppDispatch } from "@/store";
import { deleteBookOptimistic } from "@/store/books";
import { IBook } from "@/types";

import globalStyles from "@/app.module.scss";
import styles from "./deleteBookModal.module.scss";

export interface DeleteBookModalProps {
    book: IBook | null;
    onCloseModal: () => void;
}

export const DeleteBookModal: React.FC<DeleteBookModalProps> = ({ book, onCloseModal }) => {

    const dispatch = useAppDispatch();

    const handleDeleteBookOnConfirm = async () => {

        onCloseModal();

        await dispatch(deleteBookOptimistic(book?.id || ""));
    }

    return (
        <div className={styles.modalWrapper} data-testid="delete-book-modal">

            <div className={styles.overlay} onClick={onCloseModal} /> 

            <div className={styles.modal}>

                <div className={styles.modalTop}>
                    <button className={styles.closeButton} onClick={onCloseModal}>X</button>
                </div>

                <h4>Do you really want to delete "{book?.title}"?</h4>

                <div className={globalStyles.buttonContainer}>

                    <button className={`${globalStyles.button} ${styles.cancelButton}`} onClick={onCloseModal} data-testid="cancel-button">No</button>  
                    
                    <button className={`${globalStyles.button} ${styles.deleteButton}`} onClick={handleDeleteBookOnConfirm} data-testid="delete-button">Yes</button>   

                </div>

            </div>
            
        </div>
    )
}