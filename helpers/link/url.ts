import { createApiUrl, type ApiQuery } from '@/neup/core/infrastructure/api';

export class UrlBuilder {
  private base: string;
  private query: ApiQuery = {};
  constructor(base = '') { this.base = base; }
  setBasePath(base: string) { this.base = base; return this; }
  addCustomPath(path: string) {
    this.base = `${this.base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
    return this;
  }
  addParams(key: string, value: ApiQuery[string]) { this.query[key] = value; return this; }
  get() { return createApiUrl('', this.base, this.query); }
}
export function url(base = '') { return new UrlBuilder(base); }
