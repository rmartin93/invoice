import { useState } from "react";
import { supabase } from "../database/supabaseClient";
import { BsGithub } from "react-icons/bs";

export default function Login() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [ghubLoading, setGhubLoading] = useState(false);

	const handleLogin = async (event) => {
		event.preventDefault();

		setLoading(true);
		const { error } = await supabase.auth.signInWithOtp({ email });

		if (error) {
			alert(error.error_description || error.message);
		} else {
			alert("Check your email for the login link!");
		}
		setLoading(false);
	};

	const loginWithGitHub = async () => {
		setGhubLoading(true);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "github",
		});
		if (error) {
			alert(error.message);
		}
		setGhubLoading(false);
	};

	return (
		<div className="login | container h-100" style={{ marginTop: "-90px" }}>
			<div className="row align-items-center h-100">
				<div className="col-md-6 offset-md-3 text-center">
					<h1 className="text-primary">Login</h1>
					{/* <p className="description">
						Sign in via magic link with your email below
					</p> */}
					<form onSubmit={handleLogin}>
						{/* <div>
							<input
								className="form-control mb-4"
								type="email"
								placeholder="Your email"
								value={email}
								required={true}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div> */}
						{/* <div>
							<button className="btn btn-primary mx-auto" disabled={loading}>
								{loading ? (
									<>
										<div
											className="spinner-border spinner-border-sm me-2"
											role="status"
										>
											<span className="visually-hidden">Loading...</span>
										</div>
										<span className="mt-1">Sending magic link</span>
									</>
								) : (
									<span>Send magic link</span>
								)}
							</button>
						</div> */}
						<button
							className="btn btn-secondary mt-3 mx-auto"
							disabled={ghubLoading}
							type="button"
							onClick={() => loginWithGitHub()}
						>
							{ghubLoading ? (
								<>
									<div
										className="spinner-border spinner-border-sm me-2"
										role="status"
									>
										<span className="visually-hidden">Loading...</span>
									</div>
									<span className="mt-1">Logging In</span>
								</>
							) : (
								<>
									<BsGithub className="me-2" />
									<span>Login With GitHub</span>
								</>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
