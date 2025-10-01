// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFinancials } from "../store/financialsSlice";

// const FinancialTable = ({ company }) => {
//   const dispatch = useDispatch();
//   const { data, loading, error } = useSelector((state) => state.financials);

//   useEffect(() => {
//     dispatch(fetchFinancials(company));
//   }, [company, dispatch]);

//   if (loading) return <p>Loading {company} financials...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!data.length) return <p>No data found for {company}</p>;

//   return (
//     <table border="1" cellPadding="10">
//       <thead>
//         <tr>
//           <th>Revenue</th>
//           <th>Net Income</th>
//           <th>EPS</th>
//           <th>Profit Margin</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, idx) => (
//           <tr key={idx}>
//             <td>{item.revenue}</td>
//             <td>{item.netIncome}</td>
//             <td>{item.eps}</td>
//             <td>{item.profitMargin}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default FinancialTable;
