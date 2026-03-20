export interface VehicleImage {
  thumbnailUrl: string;
  fullImageUrl: string;
  priority: number;
}

export interface Vehicle {
  stockNumber: string;
  dealershipId: string;
  department: string;
  dateInStock: string;
  make: string;
  model: string;
  derivative: string;
  fullTitle: string;
  category: string;
  year: number;
  colour: string;
  mileage: number;
  transmission: string;
  drivetrain: string;
  priceExcl: number;
  priceIncl: number;
  serviceHistory: string;
  condition: string;
  comments: string;
  extras: string[];
  images: VehicleImage[];
  vin: string;
  regNo: string;
  engineNo: string;
  mmCode: string;
}

export interface FilterState {
  make: string;
  model: string;
  transmission: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  search: string;
}

export interface LeadPayload {
  DealerID: number;
  ExternalLeadID: string;
  FirstName: string;
  LastName: string;
  ContactNumber: string;
  EmailAddress?: string;
  Comments?: string;
  VehicleBrand?: string;
  Vehicle?: string;
  ModelYear?: string;
  StockNo?: string;
  NewUsed: string;
  LeadOrigin: string;
  Title?: string;
}

export interface EnquiryFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  stockNumber?: string;
  make?: string;
  model?: string;
  year?: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc' | 'mileage-asc' | 'mileage-desc';
