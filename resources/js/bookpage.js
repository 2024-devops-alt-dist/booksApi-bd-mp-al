console.log("-book page-");

// Get bookId from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("bookId").replace("/works/", ""); // replace removes extra characters from params

// Fetch book details using the bookId
async function fetchBookDetails(bookId) {
	const response = await fetch(
		`https://openlibrary.org/search.json?q=${bookId}`
	);
	const data = await response.json();
	const book = data;
	console.log("fetchBookDetails ~ book:", book);

	// book details display here .... =>
}

if (bookId) {
	fetchBookDetails(bookId);
}
