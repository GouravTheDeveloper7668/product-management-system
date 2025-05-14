import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../toast-inline/toast.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from './dashboard.service';

interface StatusCard {
  id: string;
  title: string;
  count: number;
  subtitle: string;
  icon: string;
  color: string;
}

interface TableData {
  website: string;
  formName: string;
  applicantName: string;
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

  statusCards: StatusCard[] = [
    { id: 'total', title: 'Total', count: 1778, subtitle: 'All Forms', icon: 'globe', color: '' },
    { id: 'followups', title: 'Follow Ups', count: 1396, subtitle: 'Unpaid Forms', icon: 'users', color: '' },
    { id: 'leads', title: 'Leads', count: 341, subtitle: 'Paid Forms', icon: 'bullhorn', color: '' },
    { id: 'processing', title: 'Processing', count: 57, subtitle: 'Processing', icon: 'book', color: '' },
    { id: 'delivered', title: 'Delivered', count: 203, subtitle: 'Completed', icon: 'paper-plane', color: '' },
    { id: 'dropped', title: 'Dropped', count: 79, subtitle: 'Trash', icon: 'trash', color: '' },
    { id: 'refunded', title: 'Refunded', count: 2, subtitle: 'Return', icon: 'recycle', color: '' }
  ];

  tableData: TableData[] = [
    {
      website: 'UDYAMINDIA.IN',
      formName: 'Print Udyam Application',
      applicantName: 'ARUN ARJUN KAMAKAR',
      number: '8792363057',
      status: 'Unpaid',
      price: 649,
      stage: 'Process',
      sales: 'Sales Executive',
      process: '-',
      track: '',
      convertionBy: '',
      processingStage: 'Processing',
      followUpStage: 'Not Follow',
      remark: '',
      date: '2023-05-06 22:32:24'
    },
    {
      website: 'UDYAMINDIA.IN',
      formName: 'UDYAM Cancellation',
      applicantName: 'AMIT KUMAR SHITOLE',
      number: '7000557005',
      status: 'Unpaid',
      price: 649,
      stage: 'Process',
      sales: 'Sales Executive',
      process: '-',
      track: '',
      convertionBy: '',
      processingStage: 'Processing',
      followUpStage: 'Not Follow',
      remark: '',
      date: '2023-05-06 22:25:48'
    }
  ];
  
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

  constructor(private toastService:ToastService, private titleService: Title, private fb: FormBuilder, private dashservice: DashboardService) {
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
    this.toastService.show('Welcome, This is Development Environment 😀');
   this.dashservice.dashboardData().subscribe(
    res => {
      // handle response if needed
    },
    err => {
      console.error("Dashboard data error:", err);
    }
  );

    this.statusCards.forEach(card => {
      card.color = this.getRandomColor();
    });
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

  onCardClick(card: StatusCard): void {
    console.log(`Card clicked: ${card.title}, Value: ${card.count}`);
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
