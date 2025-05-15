import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? true : router.parseUrl("/signIn");
};

export const noAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? router.parseUrl("/dashboard") : true;
};

