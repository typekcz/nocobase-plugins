# @typekcz-nocobase-plugins/plugin-oidc-plus

OpenID Connect authentication provider. Based on original NocoBase OIDC plugin with added features:

 - **RP-Initiated Logout** - uses `end_session_endpoint` to logout from issuer when logging out of NocoBase
 - **Updates user record on login** - updates users mapped fields from access token even if user exists
 - **Ability to configure any mapped field in users collection**