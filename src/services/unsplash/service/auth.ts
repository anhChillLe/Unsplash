import API from "./instance";

const Auth = {
  requestToken: async (params: TokenExchangeParams) => {
    const response = API.post('/oauth/token', {params})
    return (await response).data
  }
}

export default Auth

type TokenExchangeParams = {
  client_secret: string; 
  redirect_uri: string; 
  code: string; 
  grant_type: string; 
};