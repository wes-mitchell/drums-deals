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

export const addFavorite = (favorite) => {
  return getToken().then((token) => {
      return fetch(baseUrl, {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify(favorite),
      }).then((res) => {
          if (res.ok) {

          } else {
              throw new Error(
                  "An unknown error occurred while trying to favorite the listing.",
              )
          }
      })
  })
}

export const deleteFavorite = (listId) => {
  return getToken().then((token) => {
      return fetch(`${baseUrl}/${listId}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify(listId)
      }).then((res) => {
          if (res.ok) {
          } else if (res.status === 401) {
              throw new Error("Unauthorized")
          } else {
              throw new Error(
                  "An unknown error occured while trying to delete."
              )
          }
      })
  })
}
