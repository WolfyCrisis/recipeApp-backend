const ownerValidator = (value, owner) => {
    if (value === owner) {
        return true
    } else {
        return false
    }
}

export default ownerValidator