import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Keychain from "react-native-keychain";
import { RootState } from "../../store/store";
import { ACCESS_KEY, SECRET_KEY } from "@env";
import { Linking } from "react-native";
import axios from "axios";
import unsplash from "../../../services/unsplash/service/instance";
import unsplashService from "../../../services/unsplash";
import { RequestTokenResponse } from "../../../services/unsplash/models";
import { TokenExchangeParams } from "../../../services/unsplash/params/request_token_params";

const getToken = createAsyncThunk<string | undefined, void, { state: RootState }>("getToken", async (_, thunkApi) => {
	const credential = await Keychain.getGenericPassword();
	if (!credential) return undefined;
	const token = credential.password;
	console.log("token: ", token);
	return token;
});

const setToken = createAsyncThunk<boolean, string, { state: RootState }>(
	"setToken",
	async (token: string, thunkApi) => {
		const result = await Keychain.setGenericPassword("unsplash", token);
		return !!result;
	}
);

const clearToken = createAsyncThunk<boolean, undefined, { state: RootState }>("clearToken", async (_, thunkApi) => {
	const result = await Keychain.resetGenericPassword();
	return result;
});

const base = "https://unsplash.com/oauth/token?";
const redirect_uri = "unsplash://app/login_success";
const grant_type = "authorization_code";


const requestToken = createAsyncThunk<string | undefined, string, { state: RootState }>(
	"requestToken",
	async (code, thunkApi) => {
		const params: TokenExchangeParams = {
			client_id: ACCESS_KEY,
			client_secret: SECRET_KEY,
			redirect_uri: "unsplash://app/login_success",
			code,
			grant_type: "authorization_code",
		};

		try {
			const data = await unsplashService.auth.requestToken(params);
			Keychain.setGenericPassword("unsplash", data.access_token);
			return data.access_token;
		} catch (error) {
			console.log("RequestToken error: ", error);
		}
	}
);

export { getToken, setToken, requestToken, clearToken };