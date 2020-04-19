const API_LINK = "https://hacker-news.firebaseio.com/v0"

export const fetchItem = id => {
  return fetch(`${API_LINK}/item/${id}.json`).then(item => item.json())
}

export const fetchFeed = (type = "top") => {
  return fetch(`${API_LINK}/${type}stories.json`).then(items => items.json())
}
