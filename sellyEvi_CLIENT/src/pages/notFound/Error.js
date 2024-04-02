import React from 'react';

const NotFound = () => {
  document.title = 'NOT FOUND | ACMM OFFICIAL';
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' , height:'700px', display:'flex' , flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
      <h2 style={{fontSize: '1.5rem'}}>404 Not Found</h2>
      <p>Ups! Something Wrong Happened</p>
    </div>
  );
};

export default NotFound;