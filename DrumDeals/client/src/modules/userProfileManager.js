import { getToken } from "./authManager"
const baseUrl = `/api/UserProfile`

export const getLoggedInUser = () => {
  return getToken().then((token) =>
    fetch(`${baseUrl}/GetCurrentUserInfo`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json())
  )
}
