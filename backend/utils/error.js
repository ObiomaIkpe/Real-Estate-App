export const errorHandler = (statusCode, message) => {

console.log(error)

    const error = new Error();
    error.statusCode = statusCode
    error.message = message
    
    return error;
}