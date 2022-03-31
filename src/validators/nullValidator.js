const nullValidator = (...value) => {
    if (value.every(ele => ele != null)) {
        return true
    } else {
        return false
    }
}

export default nullValidator