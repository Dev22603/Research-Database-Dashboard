// import React, { useState } from "react";

// const ColumnSelector = ({ columns, onColumnChange }) => {
//   const [selectedColumns, setSelectedColumns] = useState(columns);

//   const handleCheckboxChange = (event) => {
//     const { name, checked } = event.target;
//     const updatedColumns = checked
//       ? [...selectedColumns, name]
//       : selectedColumns.filter((column) => column !== name);
//     setSelectedColumns(updatedColumns);
//     onColumnChange(updatedColumns); // Notify parent about column changes
//   };
// console.log(columns)
//   return (
//     <div className="bg-white shadow-lg p-4 border border-gray-200 rounded-md mb-4">
//       <h3 className="text-lg font-semibold mb-3">Select Columns to Display</h3>
//       <div className="grid grid-cols-3 gap-2">
//         {columns.map((column) => (
//           <div key={column}>
//             <label className="inline-flex items-center">
//               <input
//                 type="checkbox"
//                 name={column}
//                 checked={selectedColumns.includes(column)}
//                 onChange={handleCheckboxChange}
//                 className="mr-2"
//               />
//               {column}
//             </label>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ColumnSelector;

import React, { useState, useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai"; // Importing an arrow icon from react-icons

const ColumnSelector = ({ columns, onColumnChange }) => {
	const [selectedColumns, setSelectedColumns] = useState(columns);
	const [isOpen, setIsOpen] = useState(false);
	console.log(selectedColumns);
	console.log(columns);
  
	useEffect(() => {
		if (columns.length > 0) {
			setSelectedColumns(columns); // Set selectedColumns to the full columns array
		}
	}, [columns]);
	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target;
		const updatedColumns = checked
			? [...selectedColumns, name]
			: selectedColumns.filter((column) => column !== name);
		setSelectedColumns(updatedColumns);
		onColumnChange(updatedColumns); // Notify parent about column changes
	};

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className="relative z-20">
			<button
				onClick={toggleDropdown}
				className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md mb-4 transition duration-300 hover:bg-blue-700"
			>
				Select Columns
				<AiOutlineDown
					className={`ml-2 transform transition-transform duration-300 ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute z-10 bg-white shadow-lg border border-gray-300 rounded-md max-h-60 overflow-y-auto transition-all duration-300 ease-in-out">
					<h3 className="text-lg font-semibold p-4 border-b">
						Select Columns to Display
					</h3>
					<div className="grid grid-cols-1 gap-2 p-4">
						{columns.map((column) => (
							<div
								key={column}
								className="flex items-center hover:bg-gray-100 transition duration-200 rounded-md p-2"
							>
								<label className="inline-flex items-center">
									<input
										type="checkbox"
										name={column}
										checked={selectedColumns.includes(
											column
										)}
										onChange={handleCheckboxChange}
										className="mr-2 form-checkbox text-blue-600 focus:ring focus:ring-blue-300 rounded" // Custom checkbox styling
									/>
									<span className="text-gray-800">
										{column}
									</span>
								</label>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ColumnSelector;
