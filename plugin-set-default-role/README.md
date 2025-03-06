# @typekcz-nocobase-plugins/plugin-set-default-role

If you use multi apps on Postgres on schemas (environment variable `USE_DB_SCHEMA_IN_SUBAPP=true`) this causes an issue that main app and sub apps shares JWT. This can cause user to become different user with same ID when switching to another app. To solve this, find users collection in sub app database and put `schema:"public"` into options. Then users will be shared among apps. This plugin will assign default role to users if they have no roles set (otherwise it causes error). I also recommend to use same authenticators settings.
