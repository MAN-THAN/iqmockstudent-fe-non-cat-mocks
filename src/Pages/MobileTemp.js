import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../services/Context';
function MobileTemp() {
  const {openDesktopView } = useAuth();
 
  return (
    <div className="d-flex flex-column vw-100 vh-100 justify-content-center align-items-center align-content-center p-2">
      <img src="/iQuanta.png" alt="" width={214} className="img-fluid mb-4" />
      <p className="lh-6 text-center">This site does not support mobile or tablet version</p>
      <p className="lh-6 text-center">Please Open In Desktop Version.</p>
    </div>
  );
}

export default MobileTemp