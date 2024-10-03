// import React, { useEffect, useRef, useState } from "react";
// import Navbar from "../Components/Navbar";
// import LeftDrawer from "../Components/LeftDrawer";
// import { fetchConferences } from "../services/api.mjs";
// import TableView from "../Components/TableView";
// import FilterInput from "../Components/FilterInput";

// function Conference() {
// 	const [menu, setMenu] = useState(false);
// 	const [displayTable, setDisplayTable] = useState(false);
// 	const [currentPage, setCurrentPage] = useState(null);
// 	const [data, setData] = useState([]);

// 	const toggleDisplayTable = () => {
// 		setDisplayTable(!displayTable);
// 	};

// 	const [filters, setFilters] = useState({
// 		startDate: "",
// 		endDate: "",
// 		authorName: "",
// 		impactFactorMin: 0,
// 		impactFactorMax: 0.1,
// 		filterOption: "", // Stores the selected radio option
// 	});

// 	const handleFilter = (newFilter) => {
// 		console.log(newFilter, "Conference.jsx handleFilter");
// 		setFilters(newFilter);
// 	};

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await fetchConferences(filters);
// 				console.log(response.data);
// 				setData(response.data);
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		};
// 		fetchData();
// 	}, [filters]);

// 	const setPage = (page) => {
// 		setCurrentPage(page);
// 	};

// 	const toggleMenu = () => {
// 		setMenu(!menu);
// 	};

// 	const multiIconsRef = useRef(null);
// 	const navbarRef = useRef(null);

// 	useEffect(() => {
// 		const handleClickOutside = (event) => {
// 			if (
// 				multiIconsRef.current &&
// 				!multiIconsRef.current.contains(event.target) &&
// 				navbarRef.current &&
// 				!navbarRef.current.contains(event.target)
// 			) {
// 				setMenu(false);
// 			}
// 		};
// 		document.addEventListener("mousedown", handleClickOutside);
// 		return () => {
// 			document.removeEventListener("mousedown", handleClickOutside);
// 		};
// 	}, [multiIconsRef, navbarRef]);

// 	return (
// 		<div className="min-h-screen w-full">
// 			<Navbar Menu={toggleMenu} ref={navbarRef}></Navbar>
// 			<div className="min-h-screen w-full flex justify-around">
// 				{menu && (
// 					<LeftDrawer
// 						ref={multiIconsRef}
// 						toggleCurrentPage={setPage}
// 						currentPageName={currentPage}
// 						className="bg-gray-50 mr-10"
// 					/>
// 				)}
// 				<div className="flex flex-col w-full mx-10 items-center">
// 					<FilterInput onFilterChange={handleFilter} />
// 					<button
// 						onClick={toggleDisplayTable}
// 						className="border-2 focus:border-black p-2 bg-slate-400 rounded-[5px] w-max m-4"
// 					>
// 						Display Records
// 					</button>
// 					{displayTable && (
// 						<div className="container mx-auto p-4 my-10 border">
// 							<TableView data={data} />
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Conference;

// Working version

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import LeftDrawer from "../Components/LeftDrawer";
import { fetchConferences, fetchConferencesColumns } from "../services/api.mjs";
import TableView from "../Components/TableView";
import FilterInput from "../Components/FilterInput";
import ColumnSelector from "../Components/ColumnSelector";

function Conference() {
	const [menu, setMenu] = useState(false);
	const [displayTable, setDisplayTable] = useState(false);
	const [currentPage, setCurrentPage] = useState(null);
	const [data, setData] = useState([]);

	const toggleDisplayTable = () => {
		setDisplayTable(!displayTable);
	};

	const [filters, setFilters] = useState({
		startDate: "",
		endDate: "",
		authorName: "",
		impactFactorMinimum: 0,
		impactFactorMaximum: 10,
		filterOption: "", // Stores the selected radio option
	});

	const handleFilter = (newFilter) => {
		setFilters(newFilter);
		console.log(newFilter, "handleSubmit");
	};
	const [columns, setColumns] = useState([]);
	const [selectedColumns, setSelectedColumns] = useState([]);
	useEffect(() => {
		const fetchColumns = async () => {
			try {
				const response = await fetchConferencesColumns();
				setColumns(response.data);
				setSelectedColumns(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchColumns();

	},[]);

	const handleColumnChange = (newColumns) => {
		setSelectedColumns(newColumns);
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchConferences(filters);
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
	const buttonRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				multiIconsRef.current &&
				!multiIconsRef.current.contains(event.target) &&
				navbarRef.current &&
				!navbarRef.current.contains(event.target) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target)
			) {
				setMenu(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [multiIconsRef, navbarRef, buttonRef]);

	return (
		<div className="h-screen w-full flex flex-col">
			{/* Navbar */}
			<Navbar
				Menu={toggleMenu}
				ref={navbarRef}
				className="fixed top-0 left-0 w-full z-50 shadow-md bg-white"
			/>

			{/* Content Wrapper */}
			<div className="flex h-full ">
				{/* Left Drawer */}
				{menu && (
					<div className="fixed h-full bg-gray-50 shadow-md w-64">
						<LeftDrawer
							ref={multiIconsRef}
							toggleCurrentPage={setPage}
							currentPageName={currentPage}
						/>
					</div>
				)}

				{/* Main Content */}
				<div
					className={`flex-grow overflow-y-auto p-6 mx-auto w-full transition-all duration-500 ${
						menu ? "ml-64" : ""
					}`}
				>
					{/* Filter Section */}
					<div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
						<h2 className="text-xl font-semibold mb-4 text-gray-700">
							Filter Conferences
						</h2>
						<FilterInput onFilterChange={handleFilter} />
						<ColumnSelector
							columns={columns}
							onColumnChange={handleColumnChange}
						/>
					</div>

					{/* Display Button */}
					<button
						onClick={toggleDisplayTable}
						className="bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-700 py-2 px-4 rounded-md shadow-md transition-colors duration-300"
						ref={buttonRef}
					>
						{displayTable ? "Hide Records" : "Display Records"}
					</button>

					{/* Table Section */}
					{displayTable && (
						<div className="bg-white shadow-lg rounded-lg p-6 my-10 border border-gray-200">
							{data.length > 0 ? (
								<TableView data={data} selectedColumns={selectedColumns}/>
							) : (
								<p className="text-gray-500">
									No records found. Try adjusting the filters.
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Conference;
