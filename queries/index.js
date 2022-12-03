export const homePageQuery = `
  *[_type == "featured"] {
    ...,
    restaurants[]->{
      ...,
      dishes[]->
    }
  }
`

export const featuredRowQuery = `
  *[_type == "featured" && _id == $id] {
    ...,
    restaurants[]->{
      ...,
      dishes[]->,
      type-> {
        name
      }
    },
  }[0]
`

export const categoriesQuery = `
  *[_type == "category"]
`