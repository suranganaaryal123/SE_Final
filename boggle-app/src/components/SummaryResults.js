import React from 'react';
import './styles/SummaryResults.css';

function SummaryResults({ words, totalTime }) {
  return (
    <div className="Summary">
      <h2>SUMMARY</h2>
      <div>
        <li key="12">Total Words Found: {words.length}</li>
      </div>
      <div>
        <li key="15">Total Time: {totalTime} secs</li>
      </div>
    </div>
  );
}

export default SummaryResults;



// import React from 'react';
// import './styles/SummaryResults.css';

// function SummaryResults({ words, totalTime}) {

//   return (
//     <div className="Summary">
//       <h2>SUMMARY</h2>
     
//        <div>
//         <li key="12">Total Words Found: {words.length}</li>
        
//        </div>
      
//          <div>
//         <li key="15">Total Time: {totalTime} secs</li>
        
//        </div>    
//     </div>
//   );
// }

// export default SummaryResults;
