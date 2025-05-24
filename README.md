# NestJS Redoc

A lightweight library to easily integrate beautiful Redoc API documentation with NestJS applications.

## Why This Library?

Redoc is a **client-side** library that runs in the browser, not a Node.js package. This library provides:
- 🚀 **Easy integration** with NestJS applications
- 🎨 **Customizable themes** and styling options  
- 📱 **Responsive** documentation that works on all devices
- ⚡ **CDN-based** - no bundling required
- 🔧 **TypeScript support** with full type definitions

## Installation

```bash
npm install @hnakao/nestjs-redoc
# or
yarn add @hnakao/nestjs-redoc
```

## Quick Start

### 1. Basic Setup (Recommended)

In your `main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { setupRedoc } from 'nestjs-redoc';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create Swagger document
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // Setup Redoc - that's it! 🎉
  setupRedoc(app, document);

  await app.listen(3000);
}
bootstrap();
```

Visit `http://localhost:3000/docs` to see your beautiful API documentation!

### 2. With Custom Configuration

```typescript
setupRedoc(app, document, {
  title: 'My Awesome API',
  path: '/api-docs',
  redocOptions: {
    theme: {
      colors: {
        primary: {
          main: '#6366f1',
        },
      },
    },
    hideDownloadButton: true,
    pathInMiddlePanel: true,
  },
});
```

### 3. Using the Module (Advanced)

If you need dependency injection or want to configure globally:

```typescript
// app.module.ts
import { RedocModule } from 'nestjs-redoc';

@Module({
  imports: [
    RedocModule.forRoot({
      title: 'Global API Documentation',
      path: '/docs',
    }),
  ],
})
export class AppModule {}
```

## Pre-built Themes

Use our pre-built themes for quick styling:

```typescript
import { setupRedoc, RedocThemes } from 'nestjs-redoc';

setupRedoc(app, document, {
  title: 'My API',
  redocOptions: RedocThemes.dark, // or .modern, .minimal
});
```

## Full Configuration Options

```typescript
setupRedoc(app, document, {
  title: 'My API Documentation',
  path: '/docs',
  redocVersion: '2.1.3', // Specify Redoc version
  
  // Redoc options
  redocOptions: {
    theme: {
      colors: {
        primary: { main: '#6366f1' },
      },
      typography: {
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
      },
    },
    scrollYOffset: 60,
    hideDownloadButton: false,
    disableSearch: false,
    pathInMiddlePanel: true,
    menuToggle: true,
    expandResponses: 'all',
    requiredPropsFirst: true,
  },
  
  // Customization
  favicon: '/favicon.ico',
  logo: {
    url: '/logo.png',
    backgroundColor: '#ffffff',
    altText: 'My API Logo',
    href: 'https://myapi.com',
  },
  
  // Custom styling
  customCss: `
    .redoc-wrap {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
  `,
  
  customHead: `
    <meta name="description" content="My API Documentation">
    <link rel="preconnect" href="https://fonts.gstatic.com">
  `,
});
```

## How It Works

This library works by:

1. **Serving your OpenAPI spec** as JSON at `/docs-json`
2. **Generating HTML** that loads Redoc from CDN
3. **Configuring Redoc** to fetch and display your API spec
4. **No server-side rendering** - everything runs in the browser

Since Redoc is a client-side library, this approach is:
- ✅ **Lightweight** - no heavy dependencies
- ✅ **Fast** - served from CDN
- ✅ **Always up-to-date** - latest Redoc features
- ✅ **Customizable** - full control over appearance

## Async Configuration

For dynamic configuration:

```typescript
RedocModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    title: configService.get('API_TITLE'),
    path: configService.get('DOCS_PATH'),
    redocOptions: {
      theme: {
        colors: {
          primary: {
            main: configService.get('BRAND_COLOR'),
          },
        },
      },
    },
  }),
  inject: [ConfigService],
})
```

## Multiple Documentation Sites

You can set up multiple documentation endpoints:

```typescript
// Public API docs
setupRedoc(app, publicDocument, {
  title: 'Public API',
  path: '/docs',
});

// Admin API docs  
setupRedoc(app, adminDocument, {
  title: 'Admin API',
  path: '/admin/docs',
});
```

## Comparison with Swagger UI

| Feature | Redoc | Swagger UI |
|---------|--------|------------|
| Design | 🎨 Beautiful, modern | 📋 Functional |
| Performance | ⚡ Fast, lightweight | 🐌 Can be slow with large specs |
| Customization | 🎯 Extensive theming | 🔧 Limited styling |
| Try-it-out | ❌ Read-only | ✅ Interactive |
| Mobile | 📱 Excellent | 📱 Good |

Choose Redoc when you want beautiful, read-only documentation. Choose Swagger UI when you need interactive testing.

## License

MIT

## Contributing

Contributions welcome! This library is a thin wrapper around Redoc's browser-based functionality.