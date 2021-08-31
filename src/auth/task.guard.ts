import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class OwnTaskGuard implements CanActivate {

    constructor(private readonly authService: AuthService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        let userId = request.user.id;
        let taskId = request.params.id
        return this.authService.authorizeUserForTask(userId, taskId);
    }
}