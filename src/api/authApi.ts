import { LoginCredentials, RegistrationData, AuthResponse } from '@/types';

export const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const res = await fetch('https://fakestoreapi.com/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json();
};

export const register = async (
  user: RegistrationData
): Promise<AuthResponse> => {
  // Fakestore API doesn't really register. Mock the shape:
  return Promise.resolve({
    token: Math.random().toString(36).substr(2, 9),
    user: {
      id: Math.random().toString(36).substr(2, 9),
      username: user.username,
    },
  });
};
