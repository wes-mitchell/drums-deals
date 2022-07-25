import { getToken } from "./authManager";
const baseUrl = `/api/UserFavorite`

export const getFavoritesByListingId = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/listing/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to retrive the listing."
                )
            }
        })
    })
}

export const getAllUserFavorites = () => {
return getToken().then((token) => {
  return fetch(`${baseUrl}/favorites`, {
      method: "GET",
      headers: {
          Authorization: `Bearer ${token}`,
      },
  }).then((res) => {
      if (res.ok) {
          return res.json()
      } else {
          throw new Error(
              "An unknown error occurred while trying to retrive the favorite."
          )
      }
  })
})
}
