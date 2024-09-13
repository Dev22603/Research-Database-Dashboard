import pool from "../db/database.mjs";

const getConferencePaper = async (req, res) => {
	const { startDate, endDate, authorName, impactFactor } = req.query;
	console.log(startDate, endDate, authorName, impactFactor);

	if (!startDate || !endDate || !authorName || !impactFactor) {
		try {
			const conferencePaperResult = await pool.query(
				'SELECT * FROM public."Conference_Paper"'
			);
			res.json(conferencePaperResult.rows);
			console.log(conferencePaperResult.rows);
			
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else {
		try {
			const query = `
            SELECT *
            FROM public."Conference_Paper"
            WHERE TO_DATE("Year of Publication" || '-' || "Month of Publication", 'YYYY-Month') 
            BETWEEN TO_DATE($1, 'YYYY-MM') AND TO_DATE($2, 'YYYY-MM');
			`;


			const conferencePaperResult = await pool.query(query, [
				startDate,
				endDate,
			]);
			res.json(conferencePaperResult.rows);
			console.log(conferencePaperResult.rows);
		} catch (error) {
			console.error("Error fetching conference papers:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
};

export { getConferencePaper };
