import { Context } from '@nocobase/actions';
import { Model, Repository } from '@nocobase/database';
import { Plugin } from '@nocobase/server';

export default class DefaultRolePlugin extends Plugin {
  beforeLoad() {
    this.app.resourceManager.use(
      async (ctx: Context, next) => {
        if(!ctx.state.currentUser?.id) return next();

        // Find current user roles
        const cache = ctx.cache;
        const repository = ctx.db.getRepository('users.roles', ctx.state.currentUser.id) as unknown as Repository;
        const roles: Model[] = await cache.wrap(`roles:${ctx.state.currentUser.id}`, () =>
          repository.find({
            raw: true,
          }),
        );

        // If user has some role, no need to do anything
        if(roles?.length) return next();

        // Find default role
        const rolesRepo = ctx.db.getRepository('roles');
        const defaultRole = await cache.wrap("defaultRole", () => rolesRepo.findOne({
          filter: {
            default: true,
          },
        }));

        // Add default role to attachRole if it's empty
        const attachRoles = ctx.state.attachRoles || [];
        if(attachRoles.length == 0) {
          attachRoles.push(defaultRole);
          ctx.state.attachRoles = attachRoles;
        }
        console.log("SDROLE attachRoles", attachRoles?.map(r => r.name));

        return next();
      },
      { tag: 'setDefaultRoleWhenMissing', after: 'auth', before: 'setCurrentRole' },
    );
  }
}
