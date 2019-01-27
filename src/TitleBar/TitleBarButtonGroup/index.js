import React, { PureComponent } from 'react';
import TitleBarButton from './TitleBarButton';

// const { remote } = window.nodeRequire('electron');

const titleBarButtonOrder = {
  darwin: ['close', 'minimize', 'maximize'],
  win32: ['close', 'maximize', 'minimize'].reverse(),
};

class TitleBarButtonGroup extends PureComponent {
  constructor(props) {
    super(props);

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
    const currentWindow = remote.getCurrentWindow();
    currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize();
  }

  minimize() {
    console.log('hit minimize');
    const { remote } = this.props;
    remote.getCurrentWindow().minimize();
  }

  render() {
    const { platform } = this.props.remote.process;
    const buttonOrder = platform === 'darwin' ? titleBarButtonOrder.darwin : titleBarButtonOrder.win32;
    const titleBarButtons = buttonOrder.map((button) => <TitleBarButton key={button} type={button} event={this[button]} />);
    return (
      <div>
        {titleBarButtons}
      </div>
    )
  }
}

export default TitleBarButtonGroup;