export const handleApiError = (error) => {
    let userMessage = 'An unexpected error occurred. Please try again later.';
  
    if (error.response) {
      switch (error.response.status) {
        case 400:
          userMessage = 'There was a problem with your request. Please check your input.';
          break;
        case 401:
          userMessage = 'You are not authorized. Please log in again.';
          break;
        case 404:
          userMessage = 'Requested resource was not found.';
          break;
        case 500:
          userMessage = 'There is an issue with the server. Please try again later.';
          break;
        default:
          userMessage = 'An unexpected error occurred. Please try again later.';
          break;
      }
    } else if (error.request) {
      userMessage = 'Network error. Please check your connection.';
    }
  
    alert(userMessage);
  
    throw new Error(userMessage);
};
