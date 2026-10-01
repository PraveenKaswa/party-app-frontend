import { API_BASE_URL } from '../constants/api';

export interface AddressDetails {
  street: string;
  district: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export async function checkDeliveryApi(params: {
  lat: number;
  lng: number;
  address: string;
  addressDetails: AddressDetails;
}) {
  const response = await fetch(`${API_BASE_URL}/party/customer/location/check-delivery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  let data: any = {};
  try {
    data = await response.json();
  } catch (e) {
    console.log('Backend returned non-JSON response:', response.status);
  }

  return { ok: response.ok, data };
}

export async function subscribeWaitlistApi(params: {
  userId: number;
  lat: string;
  lng: string;
  city: string;
  street: string;
}) {
  try {
    await fetch(`${API_BASE_URL}/party/customer/notify/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    console.log('Lead captured in waitlist successfully');
  } catch (e) {
    console.log('Failed to capture location lead:', e);
  }
}

export async function searchAddressNominatim(query: string) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&countrycodes=in&limit=4&addressdetails=1`,
    {
      headers: {
        'User-Agent': 'PartyApp/1.0 (contact@partyapp.com)',
      },
    }
  );
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
