const NY_TIMES_API_KEY = import.meta.env.VITE_NY_TIMES_API_KEY;
const BASE_URL = 'https://api.nytimes.com/svc';

function requireApiKey() {
  if (!NY_TIMES_API_KEY) {
    throw new Error('Missing VITE_NY_TIMES_API_KEY. Add it to your .env file and restart Vite.');
  }
}

export const fetchTopStories = async () => {
  requireApiKey();
  const response = await fetch(
    `${BASE_URL}/topstories/v2/home.json?api-key=${encodeURIComponent(NY_TIMES_API_KEY)}`
  );
  if (!response.ok) throw new Error(`Failed to fetch top stories (${response.status})`);
  const data = await response.json();
  return data.results.slice(0, 12).map((article) => ({
    title: article.title,
    abstract: article.abstract,
    url: article.url,
    section: article.section,
    published_date: article.published_date,
  }));
};

export const searchArticles = async (query) => {
  requireApiKey();
  const params = new URLSearchParams({ q: query, 'api-key': NY_TIMES_API_KEY });
  const response = await fetch(`${BASE_URL}/search/v2/articlesearch.json?${params}`);
  if (!response.ok) throw new Error(`Failed to search articles (${response.status})`);
  const data = await response.json();
  return data.response.docs.slice(0, 12).map((article) => ({
    title: article.headline.main,
    abstract: article.abstract,
    url: article.web_url,
    section: article.section_name,
    published_date: article.pub_date,
  }));
};
