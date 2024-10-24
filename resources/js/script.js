// API URL
const url = `https://www.googleapis.com/books/v1/volumes?q=`;

// DOM access
const searchButton = document.getElementById("search-button");
const booksList = document.getElementById("books-list");

// Global variable
let allBooks = null; // create global variable for searchBooks function results

// Feature for random book search
const bookSearchQueries = [
	"fiction",
	"science fiction",
	"fantasy",
	"mystery",
	"biography",
	"self-help",
	"history",
	"children's books",
	"cookbooks",
	"graphic novels",
];

// Event listeners
searchButton.addEventListener("click", async function (e) {
	e.preventDefault();
	let query = document.getElementById("search-field").value;

	// --- if user don't put input ---
	// randomly choose category
	const randomBookQuery =
		bookSearchQueries[
			Math.floor(Math.random() * bookSearchQueries.length)
		];
	// if query is empty search for random category
	if (query === "") query = randomBookQuery;

	allBooks = await searchBooks(query);

	displayBooks(allBooks);
});

/**
 * Function to get books by query string (default 'coding')
 */
async function searchBooks(query) {
	try {
		const fullUrl = `${url}${query}`;
		const response = await fetch(fullUrl);
		const data = await response.json();
		console.log("All books", data.items);
		return data.items; // return array of books
		// booksList = ""; maybe - to clear the list for new search
	} catch (error) {
		console.error("Error fetching books:", error.message);
	}
}

/**
 * Function to display the books fetched with the searchBooks function
 */
function displayBooks(books) {
	booksList.innerHTML = "";
	books.forEach((book) => {
		const bookElement = document.createElement("li");
		bookElement.textContent = `${
			book.volumeInfo.title
		} by ${book.volumeInfo.authors.join(", ")}`;
		booksList.appendChild(bookElement);
	});
}
