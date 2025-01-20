// types/email-settings.ts
export interface EmailSettings {
    emailNewSignups: boolean;
    congratulateReferral: boolean;
    customOffboarding: boolean;
    removeHeader: boolean;
    replyToEmail: string | null;
    senderEmail: string | null;
    senderName: string | null;
    logo: string | null;
    domain: string | null;
    isDomainVerified: boolean;
  }
  
  export interface EmailSettingsResponse extends EmailSettings {
    id: string;
    waitlistId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UpdateEmailSettingsPayload extends Partial<EmailSettings> {}