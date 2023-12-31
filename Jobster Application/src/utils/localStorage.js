export const addUserToLocalStorage=(user)=>{
    localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserFromLocalStorage=()=>{
    localStorage.removeItem('user')
}

// Function getUserFromLocalStorage:
export const getUserFromLocalStorage=()=>{
    // Using the getItem Method Here:
    const result = localStorage.getItem('user')
    // Using the json.parse() Method Here:
    const user = result?JSON.parse(result):null;
    return user
}