import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export interface PhoneAuthResult {
  success: boolean;
  confirmation?: any;
  error?: string;
}

class PhoneAuthService {
  // Send OTP to phone number
  async sendOTP(phoneNumber: string): Promise<PhoneAuthResult> {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      return {
        success: true,
        confirmation
      };
    } catch (error: any) {
      let errorMessage = 'Failed to send OTP';
      
      switch (error.code) {
        case 'auth/invalid-phone-number':
          errorMessage = 'Invalid phone number format';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later';
          break;
        case 'auth/quota-exceeded':
          errorMessage = 'SMS quota exceeded. Please try again later';
          break;
        default:
          errorMessage = error.message || 'Failed to send OTP';
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  // Verify OTP
  async verifyOTP(confirmation: any, otp: string): Promise<PhoneAuthResult> {
    try {
      await confirmation.confirm(otp);
      return {
        success: true
      };
    } catch (error: any) {
      let errorMessage = 'Invalid OTP';
      
      switch (error.code) {
        case 'auth/invalid-verification-code':
          errorMessage = 'Invalid verification code';
          break;
        case 'auth/code-expired':
          errorMessage = 'Verification code has expired';
          break;
        default:
          errorMessage = error.message || 'Invalid OTP';
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}

export default new PhoneAuthService();