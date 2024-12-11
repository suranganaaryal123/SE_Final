import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from 'react';
import './styles/Board.css';

// Function to generate random letters
function generateRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function Board({ board }) {
  function tile(id, letter) {
    return (
      <Grid key={id} item xs={1} className="Tile">
        <Paper elevation={4}>
          {letter}
        </Paper>
      </Grid>
    );
  }

  function rowOfTiles(id, rowObj) {
    return (
      <Grid key={id} container spacing={1} justify="space-around">
        {Object.keys(rowObj).map((letterKey) => {
          return tile(letterKey + id, rowObj[letterKey]);
        })}
      </Grid>
    );
  }

  function gridOfRows(board) {
    return (
      <Grid item xs={12}>
        {Object.keys(board).map((rowKey) => {
          return rowOfTiles(rowKey, board[rowKey]);
        })}
      </Grid>
    );
  }

  return (
    <div className="Board-div">
      <Grid container justify="center">
        {gridOfRows(board)} {/* Render dynamic rows based on the board */}
      </Grid>
    </div>
  );
}

export default Board;




// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import React from 'react';
// import './styles/Board.css'; 


// function Board({board}) {

//   function tile(id, letter) {
//     return(
//       <Grid key={id} item xs={1} className="Tile">
//         <Paper elevation={4}>
//          {letter}
//         </Paper>
//       </Grid>);
//   }

//   function rowOfTiles(id, rowObj) {
//     return (
//       <Grid key={id} container spacing={1} justify="space-around">
//         {Object.keys(rowObj).map((letterKey) => {
//           return tile(letterKey + id, rowObj[letterKey])
//         })}
//       </Grid>);
//   }

//   function gridOfRows(board) {
//     return (
//       <Grid item xs={12}>
//         {Object.keys(board).map((rowKey) => {
//           return rowOfTiles(rowKey, board[rowKey])
//         })}
//       </Grid>);
//   }

//   return (
//         <div className="Board-div">
//       <Grid container justify="center">
//           <Grid item xs={12}>
//              <Grid container spacing={1} justifyContent="space-around">
//                <Grid item xs={1} className="Tile">
//                  <Paper elevation={4}>
//                      A
//                  </Paper>
//                </Grid>
//                <Grid item xs={1} className="Tile">
//                  <Paper elevation={4}>
//                      B
//                  </Paper>
//                </Grid>
//                <Grid item xs={1} className="Tile">
//                  <Paper elevation={4}>
//                      C
//                  </Paper>
//                </Grid>
//              </Grid>
//           </Grid>
//           <Grid item xs={12}>
//              <Grid container spacing={1} justifyContent="space-around">
//                <Grid item xs={1} className="Tile">
//                  <Paper elevation={4}>
//                      D
//                  </Paper>
//                </Grid>
//                <Grid item xs={1} className="Tile">
//                  <Paper elevation={4}>
//                      E
//                  </Paper>
//                </Grid>
//                <Grid item xs={1} className="Tile">
//                  <Paper elevation={4}>
//                      F
//                  </Paper>
//                </Grid>
//              </Grid>
//          </Grid>
//           <Grid item xs={12}>
//              <Grid container spacing={1} justify="space-around">
//                <Grid item xs={1} className="Tile">
//                  <Paper elevation={4}>
//                      G
//                  </Paper>
//                </Grid>
//                <Grid item xs={1} className="Tile">
//                  <Paper elevation={4}>
//                      H
//                  </Paper>
//                </Grid>
//                <Grid item xs={1} className="Tile">
//                  <Paper elevation={4}>
//                      I
//                  </Paper>
//                </Grid>
//              </Grid>
//           </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default Board;