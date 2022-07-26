import { getToken } from "./authManager"
const baseUrl = "/api/Listing"

export const getHomeListings = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/homepage`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to retrive the listings."
                )
            }
        })
    })
}

export const getAllListings = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to retrive the listings."
                )
            }
        })
    })
}

export const getCurrentUserListings = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/userlistings`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to retrive the listings."
                )
            }
        })
    })
}

export const addListing = (listing) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(listing),
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to save your listing.",
                )
            }
        })
    })
}

export const getListingById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
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

export const updateListing = (listing) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${listing.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(listing),
        }).then((res) => {
            if (res.ok) {

            } else {
                throw new Error(
                    "An unknown error occurred while trying to update the listing."
                )
            }
        })
    })
}

export const deleteListing = (listing) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${listing.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(listing)
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

export const getFavoriteListings = () => {
    return getToken().then((token) => {
        return fetch(`/api/UserFavorite/favoritelistings`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to retrive the listings."
                )
            }
        })
    })
}