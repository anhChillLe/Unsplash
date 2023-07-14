import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoadingScreen } from "../../components";
import { LoginResultRoute } from "../../navigations/param_list";
import { requestToken } from "../../redux/features/auth/action";
import { AppDispatch } from "../../redux/store/store";

export default function RequestToken({ route }: LoginResultRoute) {
	const code = route.params?.code;
	console.log("code: ", code);

	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(requestToken(code));
	}, []);

	return <LoadingScreen />;
}
