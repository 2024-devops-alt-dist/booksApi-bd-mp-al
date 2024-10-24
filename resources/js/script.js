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
	allBooks = await searchBooks(query);

	displayBooks(allBooks);
});

/**
 * Function to get books by query string
 */
async function searchBooks(query) {
	try {
		const fullUrl = `${url}${query}`;
		const response = await fetch(fullUrl);
		const data = await response.json();
		// console.log("All books", data.items);
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
		console.log(book);
        const sectionSearch = document.getElementById("books-list");
        const card = document.createElement("article");
        card.classList.add("books-card");
        const title = document.createElement("p");
        title.textContent= book.volumeInfo.title;
        const thumbnail = document.createElement("img");
        thumbnail.src = book.volumeInfo.imageLinks.thumbnail;
        sectionSearch.appendChild(card);
        card.appendChild(thumbnail);
        card.appendChild(title);

	});
}
