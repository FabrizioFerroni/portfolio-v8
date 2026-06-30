import { DOCUMENT, inject, Injectable, REQUEST } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { SeoData } from '../interfaces';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private document = inject(DOCUMENT);
  private title = inject(Title);
  public meta = inject(Meta);
  public request = inject(REQUEST, { optional: true });
  public router = inject(Router);
  private readonly nameApp: string = environment.name;
  private readonly defaultImage =
    'https://dummyimage.com/600x400/ffffff/030003.png&text=Fabrizio+Dev+Portfolio+Fullstack';

  setCanonicalUrl(url: string) {
    const canURL = url == undefined ? this.document.URL : url;
    const head = this.document.getElementsByTagName('head')[0];

    let element: HTMLLinkElement | null =
      this.document.querySelector(`link[rel='canonical']`) || null;

    if (!element) {
      element = this.document.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }

    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', canURL);
  }

  setIndexFollow(state: boolean = true) {
    this.meta.updateTag({
      name: 'robots',
      content: state ? 'index, follow' : 'noindex, nofollow',
    });
  }

  setTitle(title?: string) {
    this.title.setTitle(`${title !== '' ? title + ' | ' + this.nameApp : this.nameApp}`);
  }

  updateSeoTags(seoData: SeoData) {
    if (seoData.title) {
      this.setTitle(seoData.title);
    }

    this.meta.updateTag({
      name: 'description',
      content: seoData.description,
    });

    let origin: string = '';

    if (this.request) {
      const headers = this.request.headers as Headers | undefined;
      const protocol =
        (headers?.get('x-forwarded-proto') || this.request.url.split(':')[0] || 'https') + '://';
      const host = headers?.get('x-forwarded-host') || headers?.get('host') || '';
      origin = host ? `${protocol}${host}` : '';
    } else if (typeof window !== 'undefined') {
      origin = window.location.origin;
    }

    const fullUrl = `${origin}${this.router.url}`;

    //this.setCanonicalUrl(fullUrl);

    const imageUrl = seoData.image || this.defaultImage;

    this.meta.updateTag({ name: 'og:type', content: seoData.type || 'website' });
    this.meta.updateTag({ name: 'og:site_name', content: this.nameApp });
    this.meta.updateTag({ name: 'og:title', content: seoData.title });
    this.meta.updateTag({ name: 'og:description', content: seoData.description });
    this.meta.updateTag({ name: 'og:url', content: fullUrl });
    this.meta.updateTag({ name: 'og:image', content: imageUrl });
    this.meta.updateTag({ name: 'og:image:width', content: '1200' });
    this.meta.updateTag({ name: 'og:image:height', content: '630' });
    this.meta.updateTag({ name: 'og:locale', content: seoData.locale || 'es_AR' });
  }
}
