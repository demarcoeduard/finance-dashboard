import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { filter, map } from 'rxjs';

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
  theme = '';
  isUser = false;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.dataService.onGetTheme().then(() => {
      this.dataService.getData()
      .pipe(
        filter(data => !!data && !!data.theme),
        map(data => data.theme)
      )
      .subscribe(theme => {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', this.theme);
        this.isDarkMode = this.theme === 'dark';
        this.isUser = !!theme;
      });
    })

    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === "dark") {
      this.isDarkMode = true;
    } else {
      this.isDarkMode = false;
    }

    this.router.events.subscribe((event) => {
      this.activatedRoute.firstChild?.data.subscribe(data => {
        this.title = data['title'];
        let uid = localStorage.getItem('uid');
        if (uid !== null) {
          this.dataService.onGetTheme().then(() => {
            this.dataService.getData()
            .pipe(
              filter(data => !!data && !!data.theme),
              map(data => data.theme)
            )
            .subscribe(theme => {
              this.theme = theme;
              document.documentElement.setAttribute('data-theme', this.theme);
              this.isDarkMode = this.theme === 'dark';
              this.isUser = !!theme;
            });
          });
        };
      });
      this.isOpen = false;
      this.updateNav();

      if (event instanceof NavigationEnd) {
        this.location = event.url;
      };
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

    let user = localStorage.getItem('uid');
    if (user !== null) {
      let theme = this.isDarkMode ? 'dark' : 'light';
      this.dataService.onSetTheme(theme);
    }
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
      document.documentElement.setAttribute('data-theme', 'light');
      this.isDarkMode = false;
      this.isUser = false;
      this.router.navigate(['/welcome']);
    })
  }
}
