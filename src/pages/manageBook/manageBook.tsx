import { useManageBookHelper } from "./manageBookHelper.hook";
import { NavBar } from "@/components";
import { Link } from "react-router-dom";

import globalStyles from "@/app.module.scss";
import styles from "./manageBook.module.scss";

export const ManageBook = () => {
  const { register, onSubmit, isButtonDisabled, isEdit } =
    useManageBookHelper();

  return (
    <>
      <NavBar />

      <main className={globalStyles.wrapper}>
        <h1 className={globalStyles.title}>{isEdit ? "Edit" : "Add"} Book</h1>

        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>

            <input
              data-testid="title-input"
              className={globalStyles.formInput}
              {...register("title", { required: true, minLength: 3 })}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="author" className={styles.label}>
              Author
            </label>

            <input
              data-testid="author-input"
              className={globalStyles.formInput}
              {...register("author", { required: true, minLength: 3 })}
            />
          </div>

          <input
            type="submit"
            value="Save Book"
            className={`${globalStyles.button} ${styles.submitButton}`}
            disabled={isButtonDisabled}
            data-testid="submit-button"
          />
        </form>

        <div className={styles.linkContainer}>
          <Link to="/">{isEdit ? "Return" : "Go"} to Book List</Link>
        </div>
      </main>
    </>
  );
};
