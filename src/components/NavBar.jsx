import logo from "../assets/logo-with-bg.svg";
import userIcon from "../assets/image-avatar.jpg";
import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "../hooks/useTheme";
import { useEffect } from "react";
export default function NavBar({ invoiceId, setInvoiceId }) {
	useEffect(() => {
		// Show offcanvas if invoiceId is not null
		if (invoiceId) {
			const offcanvasBtn = document.getElementById("offcanvasBtn");
			offcanvasBtn.click();
		}
	}, [invoiceId]);
	const { theme, toggleTheme } = useTheme();
	return (
		<div className="myNavBar text-info bg-secondary">
			<img
				className="img-fluid bg-primary rounded-end-4"
				src={logo}
				alt="logo"
			/>
			<div className="nav-btns">
				<span>{invoiceId}</span>
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
					src={userIcon}
					alt="User Icon"
				/>
			</div>
			<button
				className="btn btn-primary d-none"
				type="button"
				data-bs-toggle="offcanvas"
				data-bs-target="#offcanvas"
				aria-controls="offcanvas"
				id="offcanvasBtn"
			>
				Button with data-bs-target
			</button>
			<div
				className="offcanvas offcanvas-start"
				tabIndex="-1"
				id="offcanvas"
				aria-labelledby="offcanvasLabel"
			>
				<div className="offcanvas-header">
					<h5 className="offcanvas-title" id="offcanvasLabel">
						Offcanvas
					</h5>
					<button
						type="button"
						className="btn-close"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
						onClick={() => setInvoiceId(null)}
					></button>
				</div>
				<div className="offcanvas-body">
					Content for the offcanvas goes here. You can place just about any
					Bootstrap component or custom elements here.
				</div>
			</div>
		</div>
	);
}
