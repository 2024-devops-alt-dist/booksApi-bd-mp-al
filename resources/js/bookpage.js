console.log("-book page-");

// Get bookId from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("bookId");

// Fetch book details using the bookId
async function fetchBookDetails(bookId) {
	const response = await fetch(
		`https://www.googleapis.com/books/v1/volumes/${bookId}`
	);
	const data = await response.json();
	const book = data.volumeInfo;
	console.log("fetchBookDetails ~ book:", book);

	// book details display here .... =>
}

if (bookId) {
	fetchBookDetails(bookId);
}
