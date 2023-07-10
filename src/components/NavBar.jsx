import logo from "../assets/logo-with-bg.svg";
import userIcon from "../assets/image-avatar.jpg";
import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "../hooks/useTheme";
import { supabase } from "../database/supabaseClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiLink, BiUnlink } from "react-icons/bi";
export default function NavBar({ session }) {
	const [webhookUrl, setWebhookUrl] = useState(null);
	useEffect(() => {
		getWebhookUrl();
	}, [session]);
	const getWebhookUrl = async () => {
		const { data, error } = await supabase
			.from("webhooks")
			.select("webhook_url")
			.eq("user_id", session.user.id)
			.single();
		if (error) {
			console.log("error: ", error);
			setWebhookUrl(null);
			return;
		}
		console.log("data: ", data);
		setWebhookUrl(data.webhook_url);
	};
	const { theme, toggleTheme } = useTheme();
	const identities = session.user.identities;
	let avatarUrl = null;
	identities.forEach((identity) => {
		if (identity.provider === "github") {
			avatarUrl = identity.identity_data.avatar_url;
		}
	});
	return (
		<div className="myNavBar text-info bg-secondary">
			<Link to="/">
				<img className="logo bg-primary rounded-end-4" src={logo} alt="logo" />
			</Link>
			<div className="nav-btns">
				<Link to="/connect" className="btn btn-icon-only text-info">
					{webhookUrl ? <BiLink /> : <BiUnlink />}
				</Link>
				<button
					type="button"
					className="btn btn-icon-only text-info"
					onClick={() => toggleTheme(theme)}
				>
					{theme === "dark" ? <BsSun /> : <BsMoon />}
				</button>
				<div className="nav-seperator"></div>
				<img
					className="userIcon rounded-circle"
					src={avatarUrl ? avatarUrl : userIcon}
					alt="User Icon"
				/>
			</div>
		</div>
	);
}
