export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number/100)
    return newNumber
}

export const getUniqueValues = (data, type) => {
    let unique = data.map((item)=> item[type])
    if(type === 'colors'){
    // Using the flat Method will return the Array
    // and not the Array of the Array:
        unique = unique.flat()
    }
    return ['all', ...new Set(unique)]
}
