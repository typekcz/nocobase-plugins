import { AuthConfig, BaseAuth } from '@nocobase/auth';

export class AnonymousAuth extends BaseAuth {
  constructor(config: AuthConfig) {
    const { ctx } = config;
    super({
      ...config,
      userCollection: ctx.db.getCollection('users'),
    });
  }

  getOptions() {
    return this.options?.public || {};
  }

  async validate() {
    const { anonymousUser } = this.getOptions();
    return this.userRepository.findById(anonymousUser);
  }
}
