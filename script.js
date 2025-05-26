
const container = document.getElementById("articlesContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const articlesPerPage = 6; // Number of articles to show per load
let currentArticleIndex = 0; // Track the current number of displayed articles

// Mock data for additional articles
      const mockArticles = [
        {
          title: "News Title Four",
          summary: "Another exciting news summary goes here...",
          image: "https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg",
          category: "business",
          author: "Sarah Lee",
          date: "May 22, 2025",
          content: "Full content for News Title Four. This article explores the latest business trends...",
        },
        {
          title: "News Title Five",
          summary: "More news content to engage readers...",
          image: "https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg",
          category: "entertainment",
          author: "Mike Wilson",
          date: "May 22, 2025",
          content: "Full content for News Title Five. This article dives into entertainment news...",
        },
        {
          title: "News Title Six",
          summary: "Latest updates in the news world...",
          image: "https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg",
          category: "technology",
          author: "Emma Davis",
          date: "May 22, 2025",
          content: "Full content for News Title Six. This article covers new tech innovations...",
        },
        {
          title: "News Title Six",
          summary: "Latest updates in the news world...",
          image: "https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg",
          category: "technology",
          author: "Emma Davis",
          date: "May 22, 2025",
          content: "Full content for News Title Six. This article covers new tech innovations...",
        },
        {
          title: "News Title Six",
          summary: "Latest updates in the news world...",
          image: "https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg",
          category: "technology",
          author: "Emma Davis",
          date: "May 22, 2025",
          content: "Full content for News Title Six. This article covers new tech innovations...",
        },
        {
          title: "News Title Six",
          summary: "Latest updates in the news world...",
          image: "https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg",
          category: "technology",
          author: "Emma Davis",
          date: "May 22, 2025",
          content: "Full content for News Title Six. This article covers new tech innovations...",
        },
        {
          title: "News Title Six",
          summary: "Latest updates in the news world...",
          image: "https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg",
          category: "technology",
          author: "Emma Davis",
          date: "May 22, 2025",
          content: "Full content for News Title Six. This article covers new tech innovations...",
        },
      ];

      // Load bookmarks from localStorage
      function loadBookmarks() {
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        const container = document.getElementById("bookmarksContainer");
        container.innerHTML = "<h3 class='mb-3'>Bookmarked Articles</h3>";
        if (bookmarks.length === 0) {
          container.style.display = "none";
          return;
        }
        container.style.display = "block";
        bookmarks.forEach((article) => {
          const articleElement = document.createElement("div");
          articleElement.className = "col-md-4 mb-4";
          articleElement.innerHTML = `
            <div class="card" data-category="bookmarks">
              <img src="${article.image}" class="card-img-top article-img" alt="${article.title}" />
              <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.summary || "No summary available."}</p>
                <div>
                  <a href="detail.html?title=${encodeURIComponent(article.title)}&image=${encodeURIComponent(article.image)}&author=${encodeURIComponent(article.author)}&date=${encodeURIComponent(article.date)}&content=${encodeURIComponent(article.content)}" class="btn btn-outline-primary btn-sm">Read More</a>
                  <button class="btn btn-outline-warning bookmark-btn bookmarked" data-title="${article.title}" data-image="${article.image}" data-author="${article.author}" data-date="${article.date}" data-content="${article.content}">
                    <i class="bi bi-bookmark-fill"></i> Bookmarked
                  </button>
                  <button class="btn btn-outline-info share-btn" data-title="${article.title}">
                    <i class="bi bi-share"></i> Share
                  </button>
                </div>
              </div>
            </div>
          `;
          container.appendChild(articleElement);
        });
      }

      // Bookmark functionality
      function toggleBookmark(button) {
        const article = {
          title: button.dataset.title,
          image: button.dataset.image,
          author: button.dataset.author,
          date: button.dataset.date,
          content: button.dataset.content,
          summary: button.parentElement.querySelector(".card-text")?.textContent || "",
        };
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        const index = bookmarks.findIndex((b) => b.title === article.title);
        if (index === -1) {
          bookmarks.push(article);
          button.classList.add("bookmarked");
          button.innerHTML = '<i class="bi bi-bookmark-fill"></i> Bookmarked';
        } else {
          bookmarks.splice(index, 1);
          button.classList.remove("bookmarked");
          button.innerHTML = '<i class="bi bi-bookmark"></i> Bookmark';
        }
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        loadBookmarks();
      }

      // Share functionality
      function shareArticle(title) {
        const url = encodeURIComponent(window.location.href);
        const shareText = encodeURIComponent(`Check out this article: ${title}`);
        const twitterUrl = `https://x.com/intent/tweet?text=${shareText}&url=${url}`;
        window.open(twitterUrl, "_blank");
      }

      // Search functionality
      document.getElementById("searchForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const query = document.getElementById("searchInput").value.toLowerCase().trim();
        const articles = document.querySelectorAll("#articlesContainer .card");
        articles.forEach((article) => {
          const title = article.querySelector(".card-title").textContent.toLowerCase();
          const summary = article.querySelector(".card-text").textContent.toLowerCase();
          if (title.includes(query) || summary.includes(query)) {
            article.style.display = "block";
          } else {
            article.style.display = "none";
          }
        });
      });

      // Navbar category filtering
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          document.querySelector(".nav-link.active")?.classList.remove("active");
          link.classList.add("active");
          const category = link.dataset.category;
          const articlesContainer = document.getElementById("articlesContainer");
          const bookmarksContainer = document.getElementById("bookmarksContainer");
          const articles = document.querySelectorAll("#articlesContainer .card");
          if (category === "bookmarks") {
            articlesContainer.style.display = "none";
            bookmarksContainer.style.display = "block";
          } else {
            articlesContainer.style.display = "block";
            bookmarksContainer.style.display = "none";
            articles.forEach((article) => {
              if (category === "all" || article.dataset.category === category) {
                article.style.display = "block";
              } else {
                article.style.display = "none";
              }
            });
          }
        });
      });

// Load more articles
// Function to render articles
function renderArticles(startIndex, count) {
  const endIndex = Math.min(startIndex + count, mockArticles.length);
  const articlesToShow = mockArticles.slice(startIndex, endIndex);

  articlesToShow.forEach((article) => {
    const articleElement = document.createElement("div");
    articleElement.className = "col-md-4 mb-4";
    articleElement.innerHTML = `
      <div class="card" data-category="${article.category}">
        <img src="${article.image}" class="card-img-top article-img" alt="${article.title}" />
        <div class="card-body">
          <h5 class="card-title">${article.title}</h5>
          <p class="card-text">${article.summary}</p>
          <div>
            <a href="detail.html?title=${encodeURIComponent(article.title)}&image=${encodeURIComponent(article.image)}&author=${encodeURIComponent(article.author)}&date=${encodeURIComponent(article.date)}&content=${encodeURIComponent(article.content)}" class="btn btn-outline-primary btn-sm">Read More</a>
            <button class="btn btn-outline-warning bookmark-btn" data-title="${article.title}" data-image="${article.image}" data-author="${article.author}" data-date="${article.date}" data-content="${article.content}">
              <i class="bi bi-bookmark"></i> Bookmark
            </button>
            <button class="btn btn-outline-info share-btn" data-title="${article.title}">
              <i class="bi bi-share"></i> Share
            </button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(articleElement);
  });

  // Update the current index
  currentArticleIndex = endIndex;

  // Show or hide the "Load More" button
  loadMoreBtn.style.display = currentArticleIndex < mockArticles.length ? 'block' : 'none';
}

// Initial rendering of articles
renderArticles(0, articlesPerPage);

// Event listener for the "Load More" button
loadMoreBtn.addEventListener('click', () => {
  renderArticles(currentArticleIndex, articlesPerPage);
});
  
      // Event delegation for bookmark and share buttons
      document.addEventListener("click", (e) => {
        if (e.target.closest(".bookmark-btn")) {
          toggleBookmark(e.target.closest(".bookmark-btn"));
        }
        if (e.target.closest(".share-btn")) {
          shareArticle(e.target.closest(".share-btn").dataset.title);
        }
      });

      // Dark mode toggle
      document.getElementById("darkModeToggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);
        document.getElementById("darkModeToggle").textContent = isDarkMode
          ? "Toggle Light Mode"
          : "Toggle Dark Mode";
      });

      // Load dark mode preference and bookmarks on page load
      if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        document.getElementById("darkModeToggle").textContent = "Toggle Light Mode";
      }
      loadBookmarks();