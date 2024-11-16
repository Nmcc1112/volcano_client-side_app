const getUserToken = () => {
    const token = localStorage.getItem('token');
  
    if (token === null) {
      return null;
    } else {
        console.log('token: ', token);
      return token;
    }
  };
  
  export default getUserToken;