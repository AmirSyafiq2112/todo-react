import { useEffect } from "react";

const useSupabase = () => {
	const supabase_url = process.env.REACT_APP_SUPABASE_URL;
	const supabase_key = process.env.REACT_APP_SUPABASE_KEY;

	const [data, setData] = useState([]);
	const [user, setUser] = useState(null);

	const supabase = createClient(supabase_url, supabase_key);
	useEffect(() => {
		const user = supabase.auth.getUser().then((response) => {
			console.log(response);
			if (response.error) {
				alert(response.error.message);
			} else {
				setUser(response.user);
			}
		});
	}, []);
};

export default useSupabase;
