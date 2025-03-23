import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  if(localStorage.getItem('userToken')!=null){
    return true;

  }
  else{
    
    return false;
  }
};
