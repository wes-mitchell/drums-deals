import { getToken } from "./authManager"
const baseUrl = "/api/Offer"

export const addOffer = (offer) => {
  return getToken().then((token) => {
      return fetch(baseUrl, {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify(offer),
      }).then((res) => {
          if (res.ok) {
              return res.json()
          } else {
              throw new Error(
                  "An unknown error occurred while trying to save your offer.",
              )
          }
      })
  })
}