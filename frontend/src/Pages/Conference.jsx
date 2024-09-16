import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import LeftDrawer from "../Components/LeftDrawer";
import { fetchConferences } from "../services/api.mjs";
import TableView from "../Components/TableView";
import FilterInput from "../Components/FilterInput";

function Conference() {
	const [menu, setMenu] = useState(false);
	const [currentPage, setCurrentPage] = useState(null);
	const [data, setData] = useState([]);

	const [filters, setFilters] = useState({
		startDate: "",
		endDate: "",
		authorName: "",
		impactFactorMin: 0,
		impactFactorMax: 0.1,
		filterOption: "", // Stores the selected radio option
	});

	const handleFilter = (newFilter) => {
		console.log(newFilter);
		setFilters(newFilter);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchConferences(filters);
				console.log(response.data);
				setData(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [filters]);

	const setPage = (page) => {
		setCurrentPage(page);
	};

	const toggleMenu = () => {
		setMenu(!menu);
	};

	const multiIconsRef = useRef(null);
	const navbarRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				multiIconsRef.current &&
				!multiIconsRef.current.contains(event.target) &&
				navbarRef.current &&
				!navbarRef.current.contains(event.target)
			) {
				setMenu(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [multiIconsRef, navbarRef]);

	return (
		<div className="h-full w-full">
			<Navbar Menu={toggleMenu} ref={navbarRef}></Navbar>
			<div className="h-full w-full flex justify-around">
				{menu && (
					<LeftDrawer
						ref={multiIconsRef}
						toggleCurrentPage={setPage}
						currentPageName={currentPage}
						className="bg-gray-50 mr-10"
					/>
				)}
				<div className="flex flex-col">
					<FilterInput onFilterChange={handleFilter} />
					<div className="container mx-auto p-4 my-10 border">
						<TableView data={data} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Conference;
