import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidebar = new EventEmitter<void>();
  isUserMenuOpen = false;
  pageTitle = 'Dashboard';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        this.updatePageTitle(event.urlAfterRedirects || event.url);
      });
  }

  onLogOut():void{
    console.log('LoggOuting');
    this.authService.logout();
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  updatePageTitle(url: string): void {
    if (url.includes('dashboard')) {
      this.pageTitle = 'Dashboard';
    } else if (url.includes('analytics/reports')) {
      this.pageTitle = 'Reports';
    } else if (url.includes('analytics/statistics')) {
      this.pageTitle = 'Statistics';
    } else if (url.includes('users')) {
      this.pageTitle = 'Users';
    } else if (url.includes('settings/profile')) {
      this.pageTitle = 'Profile Settings';
    } else if (url.includes('settings/security')) {
      this.pageTitle = 'Security Settings';
    } else {
      this.pageTitle = 'Dashboard';
    }
  }
}
