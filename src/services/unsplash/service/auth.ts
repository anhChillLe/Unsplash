import { RequestTokenResponse } from "../models/RequestTokenResponse";
import { TokenExchangeParams } from "../params/request_token_params";
import API from "./instance";

const Auth = {
  requestToken: async (params: TokenExchangeParams) => {
    const response = await API.post<RequestTokenResponse>('/oauth/token', {params})
    return response.data
  }
}

export default Auth