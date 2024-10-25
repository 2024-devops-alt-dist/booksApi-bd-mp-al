document.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	const bookId = urlParams.get("bookId").replace("/works/", "");

	async function fetchBookDetails(bookId) {
		try {
			const response = await fetch(
				`https://openlibrary.org/search.json?q=${bookId}`
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();

			if (!data.docs || !data.docs.length) {
				throw new Error("No book found");
			}

			const book = data.docs[0];

			console.log("fetchBookDetails ~ book:", book);

			populatePage(book);

			console.log("Book details populated successfully!");
		} catch (error) {
			console.error("Error fetching book details:", error.message);
			displayErrorMessage(error.message);
		}
	}

	function populatePage(book) {
		const titleElement = document.getElementById("book-title");
		const coverImage = document.getElementById("book-cover");
		const authorName = document.getElementById("author-name");
		const publishYear = document.getElementById("publish-year");
		const summary = document.getElementById("book-summary");

		if (titleElement)
			titleElement.textContent =
				book.title_suggest || "Unknown Title";

		console.log("book.cover_edition_key", book.cover_edition_key);
		if (coverImage) {
			const coverUrl = book.cover_i
				? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
				: "https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";

			coverImage.src = coverUrl;
			coverImage.alt = `${book.title_suggest || "Book"} cover`;

			// Fallback image
			coverImage.onerror = () => {
				this.src =
					"https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";
			};
		}

		if (authorName)
			authorName.textContent =
				book.author_name && book.author_name[0]
					? book.author_name[0]
					: "Unknown";

		if (publishYear)
			publishYear.textContent =
				book.publish_year && book.publish_year[0]
					? `Published ${book.publish_year[0]}`
					: "N/A";

		if (summary)
			summary.textContent = book.first_sentence
				? book.first_sentence[0]
				: "No description available";
	}

	function displayErrorMessage(message) {
		const errorDiv = document.createElement("div");
		errorDiv.innerHTML = `<h1>Error</h1><p>${message}</p>`;
		document.body.appendChild(errorDiv);
	}

	if (bookId) {
		fetchBookDetails(bookId);
	}
});
