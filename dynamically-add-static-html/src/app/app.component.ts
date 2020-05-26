import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  trustSource: boolean = false;
  selectedFile: string;

  files: Array<string> = [
    'assets/static-html-1.html',
    'assets/static-html-2.html',
    'assets/dangerous-html.html'
  ];
  title = 'dynamically-add-static-html';

  selectFile(file: string): void {
    this.selectedFile = file;
  }

  toggleIsTrusted(): void {
    this.trustSource = !this.trustSource;
  }
}
