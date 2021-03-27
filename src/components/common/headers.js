export const getHeaders = (token) => {
    return (
        {
            headers : {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token     
              }
        }
    )
};