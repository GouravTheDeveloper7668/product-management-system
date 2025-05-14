import { Component, Input, HostListener  } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  @Input() isOpen = true;
  isMobile = false;
  @Input() activeRoute = '';
  
  openMenus: { [key: string]: boolean } = {};
  
  toggleMenu(menuName: string) {
    if (this.isOpen) {
      this.openMenus[menuName] = !this.openMenus[menuName];
    }
  }
  
  isMenuOpen(menuName: string): boolean {
    return this.openMenus[menuName] || false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
    // Auto-close sidebar on mobile
    if (this.isMobile) {
      this.isOpen = false;
    }
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

}
