import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }


  showSuccess(message: string) {
    this.show(message, { classname: 'bg-white border-start border-4 border-success text-success', delay: 3000 });
  }

  showDanger(message: string) {
    this.show(message, { classname: 'bg-white border-start border-4 border-danger text-danger', delay: 3000 });
  }


  ngOnDestroy(): void {
    this.clear();
  }
}