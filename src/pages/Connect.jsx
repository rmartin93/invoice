import { useEffect, useState } from "react";
import { supabase } from "../database/supabaseClient";
export default function Connect({ session, setSession }) {
	useEffect(() => {
		checkWebhook();
	}, [session]);
	const [webHook, setWebhook] = useState(false);
	const checkWebhook = async () => {
		const { data, error } = await supabase
			.from("webhooks")
			.select("webhook_url")
			.eq("user_id", session.user.id)
			.single();
		if (error) {
			console.log("error: ", error);
			setWebhook(null);
			return;
		}
		setWebhook(data.webhook_url);
	};
	const [formPending, setFormPending] = useState(false);
	const userId = session.user.id;
	const handleSubmit = async (type) => {
		// Insert new record into the webhooks table
		setFormPending(true);
		const webhookUrl = document.getElementById("webhookUrl").value;
		const webhook = {
			user_id: userId,
			webhook_url: webhookUrl,
		};
		const alertError = document.getElementById("alertError");
		const alertSuccess = document.getElementById("alertSuccess");
		const errorMsg = document.getElementById("errorMsg");

		if (type === "insert") {
			const { error } = await supabase.from("webhooks").insert(webhook);

			if (error) {
				setFormPending(false);
				alertSuccess.classList.add("d-none");
				alertError.classList.remove("d-none");
				errorMsg.innerText = error.message;
				return;
			}
			supabase.auth.getSession().then(({ data: { session } }) => {
				setSession(session);
				setFormPending(false);
				alertError.classList.add("d-none");
				alertSuccess.classList.remove("d-none");
			});
		}
		if (type === "update") {
			const { error } = await supabase
				.from("webhooks")
				.update(webhook)
				.eq("user_id", userId);
			if (error) {
				setFormPending(false);
				alertSuccess.classList.add("d-none");
				alertError.classList.remove("d-none");
				errorMsg.innerText = error.message;
				return;
			}
			supabase.auth.getSession().then(({ data: { session } }) => {
				setSession(session);
				setFormPending(false);
				alertError.classList.add("d-none");
				alertSuccess.classList.remove("d-none");
			});
		}
	};
	return (
		<div className="container h-100" style={{ marginTop: "-90px" }}>
			<div className="row align-items-center h-100">
				<div className="col-md-6 offset-md-3 text-center">
					{webHook ? (
						<>
							<h4 className="mb-0">Invoice Boi</h4>
							<h4>x</h4>
							<p>{webHook}</p>
						</>
					) : (
						<h4>Invoice Boi x [Your Webhook]</h4>
					)}
					<form>
						<div className="my-4">
							<input
								type="text"
								className="form-control"
								id="webhookUrl"
								placeholder="Webhook url (e.g. https://example.com/webhook)"
							/>
						</div>
						<button
							type="button"
							className="btn btn-primary mx-auto"
							onClick={() => handleSubmit(webHook ? "update" : "insert")}
							disabled={formPending}
						>
							{formPending && (
								<>
									<div
										className="spinner-border spinner-border-sm me-2"
										role="status"
									>
										<span className="visually-hidden">Loading...</span>
									</div>
								</>
							)}
							{webHook ? <span>Update</span> : <span>Connect</span>}
						</button>
					</form>
					<div
						className="alert alert-success text-start mt-4 d-none"
						id="alertSuccess"
					>
						<h4>Success!</h4>
						<p className="mb-0">Your webhook is now connected.</p>
					</div>
					<div
						className="alert alert-danger text-start mt-4 d-none"
						id="alertError"
					>
						<h4>Error</h4>
						<p className="mb-0" id="errorMsg"></p>
					</div>
				</div>
			</div>
		</div>
	);
}
