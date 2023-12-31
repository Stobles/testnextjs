/* eslint-disable @typescript-eslint/indent */

import { UniversalPageProps } from './universal-page-props';

/**
 * Static properties returned by getStaticProps for static pages (using SSG)
 * Mind that those properties are generated from the server, when building the static bundle
 *
 * Multiversal page props are listed in MultiversalPageProps
 * Server-side page props are listed in SSRPageProps
 * Client-side page props are listed in SSGPageProps
 *
 * XXX SSGPageProps doesn't extend from OnlyBrowserPageProps (like SSRPageProps does with OnlyServerPageProps) because SSG properties are actually generated by the server and don't have access to browser variables
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type SSGPageProps<E extends {} = {}> = {
  // Props that are specific to SSG
  isStaticRendering: boolean;
} & UniversalPageProps & // Generic props that are provided immediately, no matter what
  E;
