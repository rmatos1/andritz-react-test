import { useHomeHelper } from "./homeHelper.hook";
import { BookList, NavBar } from '@/components';

import globalStyles from "@/app.module.scss";
import styles from "./home.module.scss";
import ContentLoader from "react-content-loader";

export const Home = () => {

  const {
    isLoading,
    displayedBooks,
    searchValue,
    onChangeValue,
    error,
    getBooks
  } = useHomeHelper();

  return (
    <>
      <NavBar />
      
      <main className={globalStyles.wrapper}>

        <h1 className={globalStyles.title}>Book List</h1>

        {
          error ? (
            <>
              <p className={globalStyles.text} data-testid="error-fetch-books">{error}<br />Click on the button below to try again</p>

              <button onClick={getBooks} className={`${globalStyles.button} ${styles.getBooksButton}`}>Get My Book List</button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Search books..."
                value={searchValue}
                onChange={onChangeValue}
                data-testid="search-input"
                className={globalStyles.formInput}
              /> 

              {
                  isLoading ?
                  (
                    <>
                      {
                        Array.from({ length: 5 }).map((_, index) => (
                          <ContentLoader viewBox="0 0 450 90" key={`loading${index}`} className={globalStyles.bookCard} data-testid="loading-indicator">
                            <rect x="0" y="0" rx="4" ry="4" width="350" height="24" />
                            <rect x="0" y="40" rx="4" ry="4" width="150" height="16" />
                          </ContentLoader>
                        ))
                      }
                    </>
                  ) : (
                    <BookList books={displayedBooks} />
                  )
              }
            </>
          )
        }

      </main>
    </>
  );
};