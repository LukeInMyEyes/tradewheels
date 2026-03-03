export interface FinanceApplication {
  // Personal
  title: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  cellphone: string;
  email: string;
  gender: string;
  maritalStatus: string;
  dependants: string;

  // Address
  streetAddress: string;
  suburb: string;
  city: string;
  postalCode: string;
  yearsAtAddress: string;

  // Employment
  employerName: string;
  occupation: string;
  employmentYears: string;
  employerPhone: string;
  employerAddress: string;

  // Income
  grossIncome: string;
  netIncome: string;
  totalExpenses: string;

  // Expenses breakdown
  bondRent: string;
  vehicleInstalments: string;
  insurance: string;
  groceries: string;
  otherExpenses: string;

  // Banking
  bankName: string;
  accountType: string;
  accountHolder: string;

  // Vehicle of interest
  vehicleInterest: string;
  depositAmount: string;

  // Consent
  consent: boolean;
}

export const TITLE_OPTIONS = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Prof', 'Rev'];
export const GENDER_OPTIONS = ['Male', 'Female'];
export const MARITAL_OPTIONS = ['Single', 'Married', 'Divorced', 'Widowed'];
export const BANK_OPTIONS = [
  'ABSA', 'African Bank', 'Bidvest Bank', 'Capitec', 'Discovery Bank',
  'FNB', 'Investec', 'Nedbank', 'Standard Bank', 'TymeBank', 'Other'
];
export const ACCOUNT_TYPE_OPTIONS = ['Cheque', 'Savings', 'Transmission'];
