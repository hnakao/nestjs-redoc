export interface RedocOptions {
  /**
   * Page title
   * @default 'API Documentation'
   */
  title?: string;

  /**
   * Path where Redoc will be served
   * @default '/docs'
   */
  path?: string;

  /**
   * Redoc version to use from CDN
   * @default '2.1.3'
   */
  redocVersion?: string;

  /**
   * Redoc configuration options
   */
  redocOptions?: {
    theme?: {
      colors?: {
        primary?: {
          main?: string;
        };
      };
      typography?: {
        fontSize?: string;
        fontFamily?: string;
      };
    };
    scrollYOffset?: number;
    hideDownloadButton?: boolean;
    disableSearch?: boolean;
    hideLoading?: boolean;
    nativeScrollbars?: boolean;
    pathInMiddlePanel?: boolean;
    menuToggle?: boolean;
    hideSchemaTitle?: boolean;
    expandResponses?: string;
    requiredPropsFirst?: boolean;
    sortPropsAlphabetically?: boolean;
    showExtensions?: boolean;
    noAutoAuth?: boolean;
    suppressWarnings?: boolean;
    payloadSampleIdx?: number;
  };

  /**
   * Custom favicon URL
   */
  favicon?: string;

  /**
   * Custom CSS to inject
   */
  customCss?: string;

  /**
   * Additional HTML to inject in head
   */
  customHead?: string;

  /**
   * Logo configuration
   */
  logo?: {
    url?: string;
    backgroundColor?: string;
    altText?: string;
    href?: string;
  };

  /**
   * Authentication configuration
   */
  auth?: {
    enabled?: boolean;
    // Add your auth configuration here
  };
}
