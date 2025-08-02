
// Security utility functions

export class SecurityUtils {
  // Content Security Policy configuration
  static getCSPHeader(): string {
    return [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');
  }

  // Sanitize HTML content to prevent XSS
  static sanitizeHTML(input: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    };
    
    return input.replace(/[&<>"'/]/g, (s) => map[s]);
  }

  // Validate email format
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  // Generate CSRF token (for future backend integration)
  static generateCSRFToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Rate limiting helper
  static createRateLimiter(maxRequests: number, windowMs: number) {
    const requests = new Map<string, number[]>();

    return (identifier: string): boolean => {
      const now = Date.now();
      const windowStart = now - windowMs;
      
      if (!requests.has(identifier)) {
        requests.set(identifier, []);
      }
      
      const userRequests = requests.get(identifier)!;
      
      // Remove old requests outside the window
      const validRequests = userRequests.filter(time => time > windowStart);
      
      if (validRequests.length >= maxRequests) {
        return false; // Rate limit exceeded
      }
      
      validRequests.push(now);
      requests.set(identifier, validRequests);
      
      return true; // Request allowed
    };
  }

  // Input validation helpers
  static validateStringLength(input: string, min: number, max: number): boolean {
    return input.length >= min && input.length <= max;
  }

  static containsOnlyAlphanumeric(input: string): boolean {
    return /^[a-zA-Z0-9\s]+$/.test(input);
  }

  // Security headers for development
  static getSecurityHeaders(): { [key: string]: string } {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Content-Security-Policy': this.getCSPHeader()
    };
  }
}
