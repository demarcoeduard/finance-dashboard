import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  animations: [
    trigger('drawer', [
      transition(':enter', [
        style({ transform: 'scaleX(0)' }),
        animate('0.3s ease', style({ transform: 'scaleX(1)' }))
      ]),
      transition(':leave', [
        style({ transform: 'scaleX(1)' }),
        animate('0.3s ease', style({ transform: 'scaleX(0)' }))
      ])
    ])
  ]
})
export class NavigationComponent implements OnInit{
  @ViewChild('btn') btn!: ElementRef;
  @ViewChild('icon') icon!: ElementRef;

  isDarkMode = false;
  isOpen = true;
  title = '';
  location = '';
  dataService = inject(DataService);
  auth = inject(AuthService);

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === "dark") {
      this.isDarkMode = true;
    } else {
      this.isDarkMode = false;
    }

    this.router.events.subscribe((event) => {
      this.activatedRoute.firstChild?.data.subscribe(data => {
        this.title = data['title'];
      });
      this.isOpen = false;
      this.updateNav();

      if (event instanceof NavigationEnd) {
        this.location = event.url;
      }
    });
    this.updateNav();
  }

  @HostListener('window:resize') updateNav() {
    if (window.innerWidth <= 1279) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  onToggleNav() {
    this.isOpen = !this.isOpen;
  }

  handleToggleNav(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onToggleNav();
    }
  }
  
  onToggleTheme() {
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'light' : 'dark');
    this.isDarkMode = !this.isDarkMode;
    
    const btnClass = this.isDarkMode ? 'move-right' : 'move-left';
    const iconClass = this.isDarkMode ? 'spin-right' : 'spin-left';

    this.btn.nativeElement.classList.remove('move-right', 'move-left');
    this.btn.nativeElement.classList.add(btnClass);

    this.icon.nativeElement.classList.remove('spin-right', 'spin-left');
    this.icon.nativeElement.classList.add(iconClass);
  }

  handleToggleTheme(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      this.onToggleTheme();
    }
  }
  
  onLogOut() {
    this.auth.signOut().subscribe(() => {
      localStorage.removeItem('uid');
      this.dataService.onSetMode();
    })
  }
}
