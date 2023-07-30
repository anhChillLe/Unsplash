import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoadingScreen } from "../../components";
import { useLoginResultRoute } from "../../navigations/hooks";
import { requestToken } from "../../redux/features/auth/action";
import { AppDispatch } from "../../redux/store/store";

export default function RequestToken() {
	const route = useLoginResultRoute()
	const code = route.params.code;
	console.log("code: ", code);

	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(requestToken(code));
	}, []);

	return <LoadingScreen />;
}
