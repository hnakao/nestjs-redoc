import { INestApplication } from '@nestjs/common';
import { RedocOptions } from '../interfaces/redoc-options.interface';
import { RedocService } from '../redoc.service';

export function setupRedoc(
  app: INestApplication,
  document: any,
  options?: RedocOptions
): void {
  // Try to get RedocService, fallback to creating a new one if not available
  let redocService: RedocService;
  try {
    redocService = app.get(RedocService, { strict: false });
  } catch (error) {
    // If RedocModule wasn't imported, create service with provided options
    redocService = new RedocService(options || {});
  }

  const finalOptions = { ...redocService.getOptions(), ...options };
  const path = finalOptions.path || '/docs';

  // Ensure path starts with / and remove trailing /
  const normalizedPath =
    ('/' + path).replace(/\/+/g, '/').replace(/\/$/, '') || '/docs';
  const jsonPath = `${normalizedPath}-json`;

  const httpAdapter = app.getHttpAdapter();

  // Setup JSON endpoint for the OpenAPI spec
  httpAdapter.get(jsonPath, (req: any, res: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.send(JSON.stringify(document, null, 2));
  });

  // Setup Redoc HTML page
  httpAdapter.get(normalizedPath, (req: any, res: any) => {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
    const host =
      req.headers['x-forwarded-host'] || req.headers.host || req.get('host');
    const baseUrl = `${protocol}://${host}`;
    const specUrl = `${baseUrl}${jsonPath}`;

    const html = redocService.generateHTML(specUrl);

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });

  console.log(`📚 Redoc documentation available at: ${normalizedPath}`);
  console.log(`📄 OpenAPI JSON spec available at: ${jsonPath}`);
}
