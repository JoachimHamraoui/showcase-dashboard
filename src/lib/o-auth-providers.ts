export const SUPPORTED_OAUTH_PROVIDERS = ["google"] as const;
export type SupportedOAuthProviders =
  (typeof SUPPORTED_OAUTH_PROVIDERS)[number];

export const SUPPORTED_OAUTH_PROVIDER_DETAILS: Record<
  SupportedOAuthProviders,
  { name: string }
> = {
  google: {
    name: "Google",
  },
};
