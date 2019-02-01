import React, { PureComponent } from 'react';

import Loading from '../Loading';

import styles from './index.module.css';

class Header extends PureComponent {
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
    const { animating } = this.state;

    if (!animating) {
      this.setState({ animating: true });
    }
  }

  render () {
    const { loading, title } = this.props;
    const { animating } = this.state;

    return (
      <header className={styles.default}>
        <h1 className={styles.title}>{title}</h1>
        <Loading key="loading" loading={loading || animating} onAnimationStart={this.handleStart} onAnimationIteration={this.handleAnimation} />
      </header>
    );
  }
}

export default Header;