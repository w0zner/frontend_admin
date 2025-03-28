import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = await authService.isAuthenticated(['ADMIN']);

  if(!isAuth){
    console.log(6)
    router.navigateByUrl('/login')
    return false
  }
  console.log(7)
  return true;
};
