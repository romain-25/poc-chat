import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {SessionService} from "../service/session.service";

export const supportGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionService = inject(SessionService);
  if ( sessionService.getSession()?.role === 'SUPPORT') {
    return true;
  }
  router.navigate(['chat']);
  return false;
};
