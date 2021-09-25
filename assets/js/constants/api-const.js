const pageApi = {
  page: (id) => `/page/${id}`,
  pages: () => `/page`,
  tags: () => `/page/tags`
}

const mediaApi = {
  medias: () => '/media',
  media: (id) => `/media/${id}`
}

const menuApi = {
  menu: () => '/menu',
  menuItem: (id) => `/menu/${id}`
}

const infosApi = {
  infos: () => '/info',
  info: (id) => `/info/${id}`
}

export { pageApi, mediaApi, menuApi, infosApi }
