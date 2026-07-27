import { EnvironmentProviders, Provider } from '@angular/core';
import { TestimonialsService } from './service';

export const testimonialConfig: (Provider | EnvironmentProviders)[] = [TestimonialsService];
