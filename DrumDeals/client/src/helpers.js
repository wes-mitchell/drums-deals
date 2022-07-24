
// formats date to read month / day / year
export const formatDate = (string) => {
  const date = new Date(string) // creates a variable to hold the string version of date
  let day = date.getUTCDate() // grabs current date of variable
  let month = date.getUTCMonth() +1 // grabs current month of variable (still unsure why +1 is needed?)
  let year = date.getUTCFullYear() // grabs current month of variable
  const formattedDate = month + "/" + day + "/" + year // puts desired format in a variable
  return formattedDate // returns the date with desired format
}