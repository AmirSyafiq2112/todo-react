import { createClient } from "@supabase/supabase-js";
import { LoginContext } from "../Context/LoginContext";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
function Login({ handleLogin, setUsername, setPassword }) {
	return (
		<div className="login">
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<input
					type="text"
					placeholder="Username"
					onChange={(event) => setUsername(event.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={(event) => setPassword(event.target.value)}
				/>
				<button>Login</button>
				{/* <button type="button" onClick={handleForgotPassword}>
					Forgot Password
				</button> */}
			</form>
		</div>
	);
}

export default Login;
