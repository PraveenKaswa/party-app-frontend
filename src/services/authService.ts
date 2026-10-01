import { API_BASE_URL } from '../constants/api';

export async function sendOtpApi(phoneNumber: string) {
  const response = await fetch(`${API_BASE_URL}/party/customer/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber }),
  });
  const data = await response.json();
  return { ok: response.ok, data };
}

export async function resendOtpApi(phoneNumber: string) {
  const response = await fetch(`${API_BASE_URL}/party/customer/auth/resend-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber }),
  });
  const data = await response.json();
  return { ok: response.ok, data };
}

export async function checkUserApi(phoneNumber: string) {
  try {
    await fetch(`${API_BASE_URL}/party/customer/auth/check-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber }),
    });
  } catch (e) {
    console.log('Error hitting check-user API:', e);
  }
}

export async function verifyOtpApi(phoneNumber: string, otp: string) {
  const response = await fetch(`${API_BASE_URL}/party/customer/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, otp }),
  });
  const data = await response.json();
  return { ok: response.ok, data };
}
