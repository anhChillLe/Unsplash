import axios from "axios";
import { RequestTokenResponse } from "../models/RequestTokenResponse";
import { TokenExchangeParams } from "../params/request_token_params";

const AuthService = {
  requestToken: async (params: TokenExchangeParams) => {
    const response = await axios.post<RequestTokenResponse>(`https://unsplash.com/oauth/token`, params)
    return response.data
  }
}

export default AuthService