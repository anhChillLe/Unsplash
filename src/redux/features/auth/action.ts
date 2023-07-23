import { ACCESS_KEY, SECRET_KEY } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Keychain from "react-native-keychain";
import unsplashService from "../../../service/unsplash";
import { TokenExchangeParams } from "../../../service/unsplash/params/request_token_params";
import { RootState } from "../../store/store";

const getToken = createAsyncThunk<string | undefined, void, { state: RootState }>("getToken", async (_, thunkApi) => {
	const credential = await Keychain.getGenericPassword();
	if (!credential) return undefined;
	const token = credential.password;
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

export { clearToken, getToken, requestToken, setToken };

