import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../toast-inline/toast.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from './dashboard.service';

export interface DashboardCard {
  id: string;
  title: string;
  count: number;
  subtitle: string;
  icon: string;
  color: string;
  parameters: {
    web: string;
    status: string;
    form_track: string;
  };
}

interface TableData {
  website: string;
  type: string;
  formName: string;
  applicantName: string;
  email: string;
  number: string;
  status: string;
  price: number;
  stage: string;
  sales: string;
  process: string;
  track: string;
  convertionBy: string;
  processingStage: string;
  followUpStage: string;
  remark: string;
  date: string;
}
@Component({
  selector: 'app-dashboad',
  templateUrl: './dashboad.component.html',
  styleUrls: ['./dashboad.component.css']
})
export class DashboadComponent implements OnInit {

  statusCards: DashboardCard[] = [];

  tableData: TableData[] = [];

  currentPage = 1;
  totalPages = 3;
  itemsPerPage = 10;
  totalItems = 24;



  filterForm: FormGroup;

  // Available color options - will randomly select from these
  colors: string[] = [
    'bg-blue-600', 'bg-red-600', 'bg-green-600',
    'bg-yellow-600', 'bg-purple-600', 'bg-pink-600', 'bg-indigo-600'
  ];

  constructor(private toastService: ToastService, private titleService: Title, private fb: FormBuilder, private dashservice: DashboardService) {
    // Initialize the form
    this.filterForm = this.fb.group({
      search: [''],
      website: ['ALL'],
      status: ['ALL'],
      stage: ['ALL'],
      price: ['ALL'],
      orderBy: ['DESC'],
      limit: ['30'],
      assign: ['ALL'],
      fromDate: [''],
      toDate: ['']
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('CRM Olfant | Dashboard');
    this.toastService.showSuccess('Completed successfully!');
    this.dashservice.dashboardData().subscribe(
      res => {
        this.statusCards = res;
      },
      err => {
        console.error("Dashboard data error:", err);
      }
    );

    this.statusCards.forEach(card => {
      card.color = this.getRandomColor();
    });

    this.onCardClick('', '', '', 'total');
  }

  activeCardId: string = 'total';

onCardClick(web: string, status: string, form_track: string, cardId: string): void {
  this.activeCardId = cardId;

    const params = { web, status, form_track, for: cardId }; // assuming `cardId` maps to the `for` param

    this.dashservice.getCardDataByParams(params).subscribe({
      next: (response) => {
        this.tableData = response?.data || [];
      },
      error: (err) => {
        console.error('API Error:', err);
        this.toastService.showDanger('Failed to fetch card data.');
        this.tableData = []; // fallback to empty
      }
    });
  }

  getTailwindGridClass(length: number): string {
    if (length <= 1) return 'grid-cols-1 sm:grid-cols-1';
    if (length == 2) return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-2';
    if (length == 3) return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3';
    if (length == 4) return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-4';
    if (length == 5) return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5';
    if (length == 6) return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6';
    return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-7';
  }

  categories: string[] = ['ALL', 'MSME', 'FSSAI', 'ISO', '360 ACADEMY'];
  selectedCategory: string = 'ALL';

  selectCategory(category: string) {
    this.selectedCategory = category;
    console.log('Selected category:', category);
  }


  getIconClass(id: string): string {
    return `bg-${id}`;
  }

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  showFilters = false;

  handleSearch(value: string): void {
    console.log('Search value:', value);
    // Implement your search logic here
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
    console.log('Filters toggled:', this.showFilters);
  }

  getRandomColor(): string {
    // Select a random color from the colors array
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }


  onSubmit(): void {
    console.log('Form submitted with values:', this.filterForm.value);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // Implement pagination logic here
    }
  }

  showFilter = false;

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

}
