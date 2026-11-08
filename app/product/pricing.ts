/** Planning targets in USD; supplier and freight quotes are not confirmed. */
export const productPricing = {
 currency: "USD",
 ritualSet: 198,
 diaryAddOn: 28,
 diaryStandalone: 32,
} as const;
export function bundlePrice(includeDiary: boolean) {
 return productPricing.ritualSet + (includeDiary ? productPricing.diaryAddOn : 0);
}
