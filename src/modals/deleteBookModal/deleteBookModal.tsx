import globalStyles from "@/app.module.scss";
import styles from "./deleteBookModal.module.scss";

export interface DeleteBookModalProps {
    bookTitle: string;
    onCloseModal: () => void;
    onDeleteBook: () => void;
}

export const DeleteBookModal: React.FC<DeleteBookModalProps> = ({ bookTitle, onCloseModal, onDeleteBook }) => {

    return (
        <div className={styles.modalWrapper} data-testid="delete-book-modal">

            <div className={styles.overlay} onClick={onCloseModal} /> 

            <div className={styles.modal}>

                <div className={styles.modalTop}>
                    <button className={styles.closeButton} onClick={onCloseModal}>X</button>
                </div>

                <h4>Do you really want to delete "{bookTitle}"?</h4>

                <div className={globalStyles.buttonContainer}>

                    <button className={`${globalStyles.button} ${styles.cancelButton}`} onClick={onCloseModal} data-testid="cancel-button">No</button>  
                    
                    <button className={`${globalStyles.button} ${styles.deleteButton}`} onClick={onDeleteBook} data-testid="delete-button">Yes</button>   

                </div>

            </div>
            
        </div>
    )
}