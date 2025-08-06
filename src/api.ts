const BASE_API_URL = "https://fakerapi.it/api/v2";

type ApiResponse<T> = {
  status: string;
  code: number;
  locale: string;
  seed: null;
  total: number;
  data: T;
};

type User = {
  id: 1;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  address: {
    id: number;
    street: string;
    streetName: string;
    buildingNumber: string;
    city: string;
    zipcode: string;
    country: string;
    country_code: string;
    latitude: number;
    longitude: number;
  };
  website: string;
  image: string;
};

export const fetchUserList = async (): Promise<ApiResponse<User[]>> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch(`${BASE_API_URL}/persons`);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
