import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogin: boolean = true;

  constructor(private _AuthService: AuthService) { }
  logOut() {
    this._AuthService.signout();
  }

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next: () => {

        if (this._AuthService.userData.getValue() != null) {
          this.isLogin = true;
        }
        else {
          this.isLogin = false;
        }

      }





    })




  }


}
