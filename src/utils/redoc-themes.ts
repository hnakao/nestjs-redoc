export const RedocThemes = {
  default: {},

  dark: {
    theme: {
      colors: {
        primary: {
          main: '#f97316',
        },
        text: {
          primary: '#ffffff',
        },
        background: {
          primary: '#1f2937',
        },
      },
    },
  },

  modern: {
    theme: {
      colors: {
        primary: {
          main: '#6366f1',
        },
      },
      typography: {
        fontSize: '14px',
        fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
      },
    },
    scrollYOffset: 60,
    hideDownloadButton: false,
    pathInMiddlePanel: true,
    menuToggle: true,
  },

  minimal: {
    theme: {
      colors: {
        primary: {
          main: '#059669',
        },
      },
      typography: {
        fontSize: '13px',
        fontFamily:
          '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
      },
    },
    hideDownloadButton: true,
    disableSearch: false,
    pathInMiddlePanel: false,
    hideSchemaTitle: true,
  },
};
