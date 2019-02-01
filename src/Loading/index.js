import React from 'react';

import styles from './index.module.css';

const Loading = props => {
  const { loading, onAnimationStart, onAnimationIteration } = props;
  return (
    <ul className={loading ? styles.parent : styles.notLoading} onAnimationStart={onAnimationStart} onAnimationIteration={onAnimationIteration}>
      <li className={loading ? styles.child : ''} />
      <li className={loading ? styles.child : ''} />
      <li className={loading ? styles.child : ''} />
      <li className={loading ? styles.child : ''} />
      <li className={loading ? styles.child : ''} />
    </ul>
  );
};

export default Loading;