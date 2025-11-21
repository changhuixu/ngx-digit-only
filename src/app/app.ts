import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="tab">
      <a routerLink="demo" routerLinkActive="active">
        Digit Only Directive Demos
      </a>
      <a routerLink="mask" routerLinkActive="active">Mask Directive Demos</a>
      <a
        title="github"
        href="https://github.com/changhuixu/ngx-digit-only"
        target="_blank"
        rel="noopener"
        style="float: right"
      >
        GitHub Repo
      </a>
    </nav>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .tab {
        overflow: hidden;
        border: 1px solid #ccc;
        background-color: #f1f1f1;
      }

      .tab a {
        background-color: inherit;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 1rem;
        transition: 0.3s;
        font-weight: 600;
        text-decoration: none;
      }

      .tab a:hover {
        background-color: #ddd;
      }

      .tab a.active {
        background-color: #ccc;
      }

      .content {
        padding: 1rem;
        border: 1px solid #ccc;
        border-top: none;
      }
    `,
  ],
})
export class App {}
