// utils/csrf.ts
export function getCsrfToken(): string {
    const tokenElement = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
    
    if (!tokenElement) {
      throw new Error('CSRF token not found. Make sure you have included the CSRF meta tag in your HTML.');
    }
    
    const token = tokenElement.content;
    
    if (!token) {
      throw new Error('CSRF token is empty. Make sure you have set the content attribute of the CSRF meta tag.');
    }
    
    return token;
  }