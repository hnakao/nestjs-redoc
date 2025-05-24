import { DynamicModule, Module } from '@nestjs/common';
import { RedocOptions } from './interfaces/redoc-options.interface';
import { RedocService } from './redoc.service';

@Module({})
export class RedocModule {
  static forRoot(options?: RedocOptions): DynamicModule {
    return {
      module: RedocModule,
      providers: [
        {
          provide: 'REDOC_OPTIONS',
          useValue: options || {},
        },
        RedocService,
      ],
      exports: [RedocService],
      global: true,
    };
  }

  static forRootAsync(options: {
    useFactory: (...args: any[]) => RedocOptions | Promise<RedocOptions>;
    inject?: any[];
    imports?: any[];
  }): DynamicModule {
    return {
      module: RedocModule,
      imports: options.imports || [],
      providers: [
        {
          provide: 'REDOC_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        RedocService,
      ],
      exports: [RedocService],
      global: true,
    };
  }
}
