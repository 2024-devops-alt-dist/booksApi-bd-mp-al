// API URL
const url = `https://openlibrary.org/search.json?q=`;
const limit = `&limit=10`;

// DOM access
const searchButton = document.getElementById("search-button");
const booksList = document.getElementById("books-list-section");

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
	let query = document.getElementById("search-field").value.trim();

	// --- if user don't put input ---
	// if query is empty search for random category
	if (query === "") {
		// randomly choose category
		const randomBookQuery =
			bookSearchQueries[
				Math.floor(Math.random() * bookSearchQueries.length)
			];
		// assign random query
		query = randomBookQuery;
	}

	console.log("search query:", query);

	try {
		allBooks = await searchBooks(query);
		if (allBooks) {
			displayBooks(allBooks);
		}
	} catch (error) {
		console.error("CUSTOM: Error searching books:", error);
	}
});

/**
 * Function to get books by query string
 */
async function searchBooks(query) {
	try {
		const fullUrl = `${url}${query}${limit}`;
		const response = await fetch(fullUrl);

		const data = await response.json();
		console.log(data);
		return data.docs; // return array of books
	} catch (error) {
		console.error("CUSTOM: Error fetching books:", error.message);
	}
}

/**
 * Function to display the books fetched with the searchBooks function
 */
function displayBooks(books) {
	booksList.innerHTML = ""; // resets the list of books on every search
	books.forEach((book) => {
		console.log(book);
		const coverId = book.cover_i;

		const cardLink = document.createElement("a"); // anchor tag for each book
		cardLink.href = "#"; // temp href
		cardLink.classList.add("book-card-link");

		const card = document.createElement("article");
		card.classList.add("books-card");

		const title = document.createElement("p");
		title.classList.add("books-card-title");
		title.textContent = book.title;

		const author = document.createElement("p");
		author.textContent = book.author_name;

		const thumbnail = document.createElement("img");
		thumbnail.src = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;

		card.appendChild(thumbnail);
		card.appendChild(title);

		cardLink.appendChild(card); // this will wrap the card with the anchor tag

		booksList.appendChild(cardLink);

		// event listener to handle navigation
		cardLink.addEventListener("click", (e) => {
			e.preventDefault();
			navigateToBookDetails(book.key);
		});
	});
}

// handle navigation to book details page
function navigateToBookDetails(bookId) {
	// Redirect to bookpage.html, passing the book ID as a query parameter
	window.location.href = `bookpage.html?bookId=${bookId}`;
}
