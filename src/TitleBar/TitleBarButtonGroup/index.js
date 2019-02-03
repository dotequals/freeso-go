import React, { PureComponent } from 'react';
import TitleBarButton from './TitleBarButton';

import styles from './index.module.css';

class TitleBarButtonGroup extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      maximized: false,
    }

    this.close = this.close.bind(this);
    this.maximize = this.maximize.bind(this);
    this.minimize = this.minimize.bind(this);
  }

  close() {
    const { remote } = this.props;
    remote.app.quit();
  }

  maximize() {
    const { remote } = this.props;
    const { maximized } = this.state;
    const currentWindow = remote.getCurrentWindow();
    if (!maximized) {
      currentWindow.maximize();
      this.setState({ maximized: true });
    } else {
      currentWindow.unmaximize();
      this.setState({ maximized: false });
    }
  }

  minimize() {
    const { remote } = this.props;
    remote.getCurrentWindow().minimize();
  }

  render() {
    const { remote } = this.props;
    const { platform } = remote.process;
    const buttonOrder = ['minimize', 'maximize', 'close'];
    const titleBarButtons = buttonOrder.map((button) => <TitleBarButton key={button} platform={platform} type={button} event={this[button]} />);

    return (
      <div className={styles.default}>
        {titleBarButtons}
      </div>
    )
  }
}

export default TitleBarButtonGroup;