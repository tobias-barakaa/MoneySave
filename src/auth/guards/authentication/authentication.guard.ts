import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap: Record<AuthType, CanActivate>;

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: { 
        canActivate: () => Promise.resolve(true) 
      } as CanActivate,
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Use getAllAndMerge to combine auth types from class and method
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    console.log(authTypes, 'authTypes (merged)');
    console.log('Auth type mapping:', {
      [AuthType.Bearer]: 'AccessTokenGuard',
      [AuthType.None]: 'PublicGuard'
    });

    // Map auth types to guards (no .flat() needed)
    const guards = authTypes.map(type => this.authTypeGuardMap[type]);
    console.log(`Found ${guards.length} guards for types:`, authTypes);

    // Validate all guards exist
    const invalidTypes = authTypes.filter(type => !this.authTypeGuardMap[type]);
    if (invalidTypes.length > 0) {
      throw new Error(`No guards configured for auth types: ${invalidTypes}`);
    }

    // Try each guard (OR logic - any can succeed)
    for (let i = 0; i < guards.length; i++) {
      const guard = guards[i];
      const authType = authTypes[i];
      
      console.log(`Trying guard ${i + 1}/${guards.length} for AuthType.${AuthType[authType]}`);
      
      try {
        const result = await Promise.resolve(guard.canActivate(context));
        console.log(`Guard ${i + 1} result:`, result);
        
        if (result) {
          console.log(`✅ Authentication successful with AuthType.${AuthType[authType]}`);
          return true;
        }
      } catch (err) {
        console.log(`❌ Guard ${i + 1} failed:`, err.message || err);
        // Continue to next guard
      }
    }

    console.log('❌ All guards failed');
    throw new UnauthorizedException('Authentication failed - no valid credentials provided');
  }
}
// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';
// import { AccessTokenGuard } from '../access-token/access-token.guard';
// import { AuthType } from 'src/auth/enums/auth-type.enum';
// import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

// @Injectable()
// export class AuthenticationGuard implements CanActivate {

//   private static readonly defaultAuthType = AuthType.Bearer;
//   private readonly authTypeGuardMap: Record<
//     AuthType, CanActivate | CanActivate[]
//   >;

//   constructor(
//     private readonly reflector: Reflector,
//     private readonly accessTokenGuard: AccessTokenGuard,
//   ) {
//     this.authTypeGuardMap = {
//       [AuthType.Bearer]: this.accessTokenGuard,
//       [AuthType.None]: { canActivate: () => true },
//     };
//   }
//   async canActivate(
//     context: ExecutionContext,
//   ): Promise<boolean> {

//     // AuthTypes from reflector
//     const authTypes = this.reflector.getAllAndOverride(
//       AUTH_TYPE_KEY,
//       [context.getHandler(), context.getClass()],
//     )
//      ?? [AuthenticationGuard.defaultAuthType];
//      console.log(authTypes, 'authTypes..................................');

//      const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat()
//      // print all the guards;
//      console.log(guards, 'guards..................................');

//      // Default error
//      const error = new UnauthorizedException();
//     // array of guards
//     // l[p guards canActivate
//     // console.log(this.authTypeGuardMap, 'authTypeGuardMap..................................');
//     for(const instance of guards) {
//       console.log(instance, 'instance..................................');
//       const canActivate = await Promise.resolve(
//         instance.canActivate(context)).catch((err) => {
//           error: err;
//         });
//         console.log(canActivate, 'canActivate..................................');
//         if(canActivate) {
//           return true;
//         }

      
//     }
//     throw error;
//   }
// }
 