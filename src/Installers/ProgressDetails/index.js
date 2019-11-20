import React from 'react';

const ProgressDetails = props => {
  const { status, progress } = props;
  return (
    <div>
      <div>
        {status}...
      </div>
      <div>
        {progress}%
      </div>
    </div>
  );
}

export default ProgressDetails;