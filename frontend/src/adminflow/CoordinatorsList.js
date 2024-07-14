import { useEffect, useState } from "react";
import { getAllCoordinators, changeCoordinatorPermission } from "../actions/authActions";
import { Link } from "react-router-dom";
import { ProtectRoute } from "../managerRoutes/protectRoutes";
import DashboardRibbon from "./DashboardRibbon";

const CoordinatorsList = () => {
	const [coordinatorsArray, setCoordinatorsArray] = useState([]);
	const [refresh, setRefresh] = useState(false);

	const [error, setError] = useState("");

	useEffect(() => {
		handleGetCoordinators();
	}, [refresh]);

	const handleGetCoordinators = () => {
		getAllCoordinators().then((res) => {
			//console.log(res)
			if (res === undefined) {
				setError("Server Down, Contact Dev Cell");
			} else {
				setCoordinatorsArray(res.response);
			}
		});
	};

	const handleCoordinatorPermission = (id) => {
		// console.log(teacherId)
		changeCoordinatorPermission(id)
		.then((response) => {
			setRefresh(true);
		})
		.catch((err) => {
			console.log(err);
		});
		setRefresh(false);
	};

	return (
		<ProtectRoute>
			<DashboardRibbon />
			<div className="container-fluid mt-5">
			<div>
				{error === "" ? null : (
				<div className="py-5 fs-4 text-center text-danger">{error}</div>
				)}
				<div className="container">
				<h2 className="fw-bold">All Coordinators</h2>
				<div className="">
					<div className="">
					{coordinatorsArray.map((t, i) => (
						<div key={i} className="py-2">
						<div
							className={`card p-2 bg-transparent ${
							t?.isActive
								? `border-primary`
								: `border-danger`
							} border-2`}
						>
							<div>
								<span className="fw-bold">Name: </span>
								{t?.firstName} {t?.middleName} {t?.lastName}
							</div>
							<div>
								<span className="fw-bold">Email: </span>
								{t?.email}
							</div>
							<div>
								<span className="fw-bold">Department: </span>
								{t?.department}
							</div>
							<div
								className={`${
									t?.isActive
									? `text-primary`
									: `text-danger`
								}`}
							>
								<span className="fw-bold text-dark">Status: </span>
								{t?.isActive ? "Active" : "Not Active"}
							</div>
							<hr />
							<div className="d-flex flex-wrap justify-content-between">
								<Link to={"/coordinators/update"} state={{ from: t }}>
								<button className="my-1 btn btn-sm btn-outline-warning">
									Update
								</button>
								</Link>
								{t?.isActive ? (
									<button
										onClick={() =>
											handleCoordinatorPermission(t?._id)
										}
										className="my-1 btn btn-danger btn-sm"
									>
										Deactivate Teacher
									</button>
									) : (
									<button
										onClick={() =>
											handleCoordinatorPermission(t?._id)
										}
										className="my-1 btn btn-danger btn-sm"
									>
										Activate Teacher
									</button>
								)}
							</div>
						</div>
						</div>
					))}
					</div>
				</div>
				</div>
			</div>
			</div>
		</ProtectRoute>
	);
};

export default CoordinatorsList;