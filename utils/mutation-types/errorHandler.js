const UNHANDLED_EXCEPTION = 'UNHANDLED EXCEPTION, please reload the page'
// err.response.data.error_description
const ErrorHandler = (err) => {
  // err.response.data.message
  const errors = []
  if (err.response && err.response.data) {
    if (err.response.data.hasError) {
      const { fieldValidationErrors, processErrors } = err.response.data
      if (fieldValidationErrors) {
        err.response.data.fieldValidationErrors.forEach((e) => {
          errors.push(e.message)
        })
      } else if (processErrors) {
        err.response.data.processErrors.forEach((e) => {
          errors.push(e.errorMessage)
        })
      } else if (err.response.data.response) {
        errors.push(err.response.data.response)
      } else if (err.response.status === 417) {
        errors.push(UNHANDLED_EXCEPTION)
      } else {
        errors.push(err.response.data.errorMessage)
      }
    } else if (err.response.data.errorMessage) {
      errors.push(err.response.data.response)
    } else if (err.response.data.message) {
      errors.push(err.response.data.message)
    } else if (err.response.data.error_description.includes('token expired')) {
      errors.push('Session expired!!!')
    }
  } else if (err && err.message) {
    errors.push(err.message)
  } else {
    errors.push(UNHANDLED_EXCEPTION)
  }

  return errors
}

export default ErrorHandler
