import { InstallOptions, Plugin } from '@nocobase/server';
import { authType } from '../constants';
import { AnonymousAuth } from './anonymous-auth';

export class AuthAnonymousPlugin extends Plugin {
  afterAdd() {}

  beforeLoad() {}

  async load() {
    this.app.authManager.registerTypes(authType, {
      auth: AnonymousAuth,
    });
  }

  async install(options?: InstallOptions) {}

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default AuthAnonymousPlugin;
