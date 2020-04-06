/**
 * Because this workshop can be given in many contexts, it's nice to have
 * multiple logos which we can use for different workshops.
 *
 * Currently there's the Arcady™️ branded logo and the default is the open-wc
 * logo for providing awesome resources on web components.
 *
 * To use a logo, add a queryparameter ?l=a or ?l=o to switch between them.
 *
 * DISCLAIMER: The creator and maintainer of this codebase is not affiliated with open-wc.
 */

const LOGO_RESOURCES = {
  ARCADY: {
    BIG: 'arcady-logo.png',
    SMALL: 'bear.png',
  },
  OPENWC: {
    BIG: 'open-wc-logo.png',
    SMALL: 'open-wc-logo.png',
  }
}

const LOGO_CONSTANTS = {
  'a': LOGO_RESOURCES.ARCADY,
  'o': LOGO_RESOURCES.OPENWC,
}

const IMPORT_PREFIX = `/src/assets/`;

// Decide which logo to use for which workshop
const params = new URLSearchParams(window.location.search);
let logo = LOGO_CONSTANTS[params.get('l')];
if (!logo) {
  logo = LOGO_RESOURCES.OPENWC; // Fallback when not specified
}

export const getFullSizeLogo = () => `${IMPORT_PREFIX}${logo.BIG}`;

export const getSmallSizeLogo = () => `${IMPORT_PREFIX}${logo.SMALL}`;
