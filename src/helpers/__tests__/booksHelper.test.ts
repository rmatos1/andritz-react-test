import { describe, expect, it } from "vitest";

import { sortBooksByTitle } from "../booksHelper";

describe("booksHelper", () => {
  it("should return the books sorted alphabetically", () => {
    const nonSortedBooks = [
      {
        id: "2",
        title: "Book 2",
        author: "Author 2",
      },
      {
        id: "1",
        title: "Book 1",
        author: "Author 1",
      },
    ];

    const sortedBooks = [
      {
        id: "1",
        title: "Book 1",
        author: "Author 1",
      },
      {
        id: "2",
        title: "Book 2",
        author: "Author 2",
      },
    ];

    const result = sortBooksByTitle(nonSortedBooks);

    expect(JSON.stringify(result)).toEqual(JSON.stringify(sortedBooks));
  });
});
