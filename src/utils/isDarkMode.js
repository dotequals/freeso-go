const isDarkMode = () => {
  const style = getComputedStyle(document.body);

  return style.getPropertyValue('--background') === style.getPropertyValue('--background-dark');
}

export default isDarkMode;