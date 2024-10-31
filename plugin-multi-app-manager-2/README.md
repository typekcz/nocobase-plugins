# @typekcz-nocobase-plugins/plugin-multi-app-manager-2

Based on @nocobase/plugin-multi-app-manager. Changed to use schemas instead of databases for sub apps in Postgres.

Main app and sub apps shares JWT. This can cause user to become different user with same ID when switching to another app. To solve this, find users collection in sub app database and put `schema:"public"` into options. Then users will be shared among apps. This plugin will also assing default role to users if they have no roles set (otherwise it causes error). I also recommend to use same authenticators settings.