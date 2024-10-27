const apiKey = "muvKfoqMsfi-Tw_cahQFQh_HpE4rYTodZHr4uaD6jFEa1KPG"; // Your actual API key

const searchButton = document.querySelector(".search-button");
const searchIcon = document.querySelector(".search-icon");
const searchSpin = document.querySelector(".search-spin");
const newsContainer = document.querySelector(".news-container");

searchButton.addEventListener("click", () => {
  const query = document.querySelector(".search-input").value.trim();

  if (query) {
    // Show loading spinner and hide search icon
    searchIcon.style.display = "none";
    searchSpin.style.display = "inline";

    fetchNews(query).finally(() => {
      // Hide loading spinner and show search icon after fetch completes
      searchIcon.style.display = "inline";
      searchSpin.style.display = "none";
    });
  } else {
    newsContainer.innerHTML = "<p>please enter a search term</p>";
  }
});

// Function to fetch news based on category
async function fetchNews(query) {
  let url;

  if (query === "recent") {
    url = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`; // Fetch latest news
  } else {
    url = `https://api.currentsapi.services/v1/search?apiKey=${apiKey}&keywords=${query}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch news");
    }
    console.log(data.news);

    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ""; // Clear previous news

    // Check if there are any news articles
    if (data.news && data.news.length > 0) {
      // Loop through the news articles
      data.news.forEach((article) => {
        // Create a new div for each news item
        const newsItem = document.createElement("div");
        newsItem.className = "news-item";

        // Insert the article image, title, and description
        newsItem.innerHTML = `
                    <img src="${
                      article.image
                        ? article.image
                        : "https://via.placeholder.com/300"
                    }" alt="${article.title}">
                    <h3>${article.title}</h3>
                    <p>${article.description || "No description available."}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;

        // Append each news item to the container
        newsContainer.appendChild(newsItem);
      });
    } else {
      newsContainer.innerHTML = "<p>No news articles found.</p>";
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML =
      "<p>Error fetching news. Please try again later.</p>";
  }
}

// Fetch recent news on initial load
window.onload = function () {
  const category = window.location.search.split("category=")[1] || "recent";
  fetchNews(category);
};

// const searchInput = document.querySelector(".search-input");
// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", () => {
//   const query = searchInput.value.trim();
//   fetchNews(query);
//   updateHistory(keyword);
// });

// Update history when category button is clicked
function updateHistory(category) {
  history.pushState(null, "", `?category=${category}`);
}

const ham = document.querySelector(".ham");
const buttons = document.querySelector(".buttons");
ham.addEventListener("click", () => {
  buttons.classList.toggle("show");
});
