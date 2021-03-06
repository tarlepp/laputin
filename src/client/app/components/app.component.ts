import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <nav class="navbar navbar-inverse navbar-static-top" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a href="/" class="navbar-brand">Laputin</a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li><a href="#files">Files</a></li>
                        <li><a href="#tags">Tags</a></li>
                        <li><a href="#duplicates">Duplicates</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <router-outlet></router-outlet>
    `
})
export class AppComponent { }