import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserData } from '../interfaces/active-user.interface';
import { REQUEST_USER_KEY } from '../constants/auth.constants';

export const ActiveUser = createParamDecorator(
    (field: keyof ActiveUserData, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user:ActiveUserData = request[REQUEST_USER_KEY]
        return field ? user?.[field] : user;
        // Assuming the user is attached to the request object
        return request.user || null; // Return the active user or null if not authenticated
    }
);