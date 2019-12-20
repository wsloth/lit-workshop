import { html, fixture, expect } from '@open-wc/testing';

import '../workshop-fe-chat.js';

describe('WorkshopFeChat', () => {
  it('has page "main" by default', async () => {
    const el = await fixture(html`
      <workshop-fe-chat></workshop-fe-chat>
    `);

    expect(el.page).to.equal('main');
    expect(el.shadowRoot.querySelector('main')).lightDom.to.equal(`
      <page-main></page-main>
    `);
  });

  it('renders default fallback content', async () => {
    const el = await fixture(html`
      <workshop-fe-chat></workshop-fe-chat>
    `);
    el.page = undefined;

    expect(el.page).to.equal(undefined);
    expect(el.shadowRoot.querySelector('main')).lightDom.to.equal(`
      <page-main></page-main>
    `);
  });

  it('renders page-one if page property is set to pageOne', async () => {
    const el = await fixture(html`
      <workshop-fe-chat page="pageOne"></workshop-fe-chat>
    `);
    expect(el.shadowRoot.querySelector('main')).lightDom.to.equal(`
      <page-one></page-one>
    `);
  });

  it('changes the page if a menu link gets clicked', async () => {
    const el = await fixture(html`
      <workshop-fe-chat></workshop-fe-chat>
    `);
    el.shadowRoot.querySelectorAll('header a')[2].click();

    expect(el.page).to.equal('about');
  });

  it('matches the snapshot', async () => {
    const el = await fixture(html`
      <workshop-fe-chat></workshop-fe-chat>
    `);

    expect(el).shadowDom.to.equalSnapshot();
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`
      <workshop-fe-chat></workshop-fe-chat>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
