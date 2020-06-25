const THEMES = {
   light: 'light',
   dark: 'dark'
};

const getSystemColorScheme = () => {
   const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
   const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches;
   if (isDarkMode) {
      return THEMES.dark;
   } else if (isLightMode) {
      return THEMES.light;
   }
}

export {
   THEMES,
   getSystemColorScheme
}
