import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor() { }
  ngOnInit() {
    // Check if the user prefers the dark theme and apply it
    const isDarkTheme = localStorage.getItem('dark-theme') === 'true';
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    }
  }

  toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-theme'); // Toggle a class named 'dark-theme'

    // Save the user's preference in local storage
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('dark-theme', isDark.toString());
  }





}
