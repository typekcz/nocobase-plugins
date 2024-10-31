import { Context } from '@nocobase/actions';
import { Plugin } from '@nocobase/server';

export class SubAppModsPlugin extends Plugin {
  beforeLoad() {
    this.app.resourceManager.use(
      async (ctx: Context, next) => {
        if (!ctx.state.currentUser) {
          return next();
        }

        const rolesRepo = ctx.db.getRepository('roles');
        const defaultRole = await rolesRepo.findOne({
          filter: {
            default: true,
          },
        });

        const attachRoles = ctx.state.attachRoles || [];
        attachRoles.push(defaultRole);
        ctx.state.attachRoles = attachRoles;

        return next();
      },
      { tag: 'setDefaultRoleWhenMissing', after: 'auth', before: 'setCurrentRole' },
    );
  }
}
