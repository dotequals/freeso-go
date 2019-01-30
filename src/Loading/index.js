import React, { PureComponent } from 'react';

import styles from './index.module.css';

class Loading extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
    }

    this.handleAnimation = this.handleAnimation.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  handleAnimation() {
    const { loading } = this.props;

    if (!loading) {
      this.setState({ animating: false });
    }
  }

  handleStart() {
    this.setState({ animating: true });
  }

  render() {
    const { loading } = this.props;
    const { animating } = this.state;
    return (
      <ul className={loading || animating ? styles.parent : styles.notLoading} onAnimationStart={this.handleStart} onAnimationIteration={this.handleAnimation}>
        <li className={loading || animating ? styles.child : ''} />
        <li className={loading || animating ? styles.child : ''} />
        <li className={loading || animating ? styles.child : ''} />
        <li className={loading || animating ? styles.child : ''} />
        <li className={loading || animating ? styles.child : ''} />
      </ul>
    );
  } 
};

export default Loading;