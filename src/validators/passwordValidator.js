const passwordMinLength = 6
const passwordMaxLength = 18

const passwordValidator = (value) => {
    if(value.length >= passwordMinLength && value.length <= passwordMaxLength) {
        return true
    } else {
        return false
    }
}

export default passwordValidator