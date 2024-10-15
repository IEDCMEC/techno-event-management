interface AlertOptions {
    title: string;
    description?: string;
    status: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
  }
  
  export declare const useAlert: () => (options: AlertOptions) => void;
  