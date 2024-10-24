// API URL
const url = `https://www.googleapis.com/books/v1/volumes?q=`;

// DOM access
const searchButton = document.getElementById("search-button");
const booksList = document.getElementById("books-list");

// Global variable
let allBooks = null; // create global variable for searchBooks function results

// Event listeners
searchButton.addEventListener("click", async function (e) {
	e.preventDefault();
	let query = document.getElementById("search-field").value;
	console.log("query:", query);

	// if user dont put input
	if (query === "") query = "coding"; // fallback value if input empty
	// let random = null; // let find random book
	// query = "" ? (query = random) : (query = query);
	allBooks = await searchBooks(query);
	// console.log(allBooks);

	// displayBooks(allBooks); //
	console.log("THE SEARCH BUTTON WAS CLICKED");
});

/**
 * Function to get books by query string (default 'coding')
 */
async function searchBooks(query = "coding") {
	try {
		const fullUrl = `${url}${query}`;
		const response = await fetch(fullUrl);
		const data = await response.json();
		console.log(data);
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
