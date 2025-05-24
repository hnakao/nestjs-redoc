import { Inject, Injectable } from '@nestjs/common';
import { RedocOptions } from './interfaces/redoc-options.interface';

@Injectable()
export class RedocService {
  constructor(
    @Inject('REDOC_OPTIONS') private readonly options: RedocOptions = {}
  ) {}

  generateHTML(specUrl: string): string {
    const {
      title = 'API Documentation',
      redocOptions = {},
      favicon,
      customCss = '',
      customHead = '',
      logo,
    } = this.options;

    // Escape and stringify options for safe injection
    const redocOptionsJson = JSON.stringify(redocOptions)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');

    const faviconTag = favicon
      ? `<link rel="icon" type="image/x-icon" href="${favicon}" />`
      : '';

    const logoConfig = logo
      ? JSON.stringify(logo).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')
      : 'undefined';

    return `
<!DOCTYPE html>
<html>
  <head>
    <title>${this.escapeHtml(title)}</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
    ${faviconTag}
    <style>
      body { 
        margin: 0; 
        padding: 0; 
        font-family: Roboto, sans-serif;
      }
      #redoc-container {
        height: 100vh;
      }
      ${customCss}
    </style>
    ${customHead}
  </head>
  <body>
    <div id="redoc-container"></div>
    <script src="https://unpkg.com/redoc@latest/bundles/redoc.standalone.js"></script>
    <script>
      const options = ${redocOptionsJson};
      ${logo ? `options.logo = ${logoConfig};` : ''}
      
      Redoc.init('${this.escapeHtml(
        specUrl
      )}', options, document.getElementById('redoc-container'));
    </script>
  </body>
</html>`;
  }

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  getOptions(): RedocOptions {
    return this.options;
  }
}
