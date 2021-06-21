const pageApi = {
  page: (id) => `/page/${id}`,
  pages: () => `/page`,
  tags: () => `/page/tags`
}

const mediaApi = {
  medias: () => '/media',
  media: (id) => `/media/${id}`
}

export { pageApi, mediaApi }
