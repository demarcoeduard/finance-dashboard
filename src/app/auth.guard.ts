import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let uid = localStorage.getItem('uid');

  if (uid) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
