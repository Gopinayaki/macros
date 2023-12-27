import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  

 

  
  searchTerm: string ='';
  tableData: any; // Replace with your actual table data array

  constructor(private router: Router) {}

  search() {
    // Filter the table data based on the search term
    const filteredData = this.tableData.filter((item: { name: string; }) => {
      // Adjust the condition based on your table structure and search requirements
      return item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });

    // Use the filtered data as needed (e.g., update the displayed table data)
    // ...

    // Navigate to the next page
    this.router.navigate(['/next-page']);
  }
}


