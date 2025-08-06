const BASE_API_URL = 'https://fakerapi.it/api/v2/'

type ApiResponse<T> = {
  status: string
  code: number
  locale: string
  seed: null
  total: number
  data: T
}

type Person = {
  id: 1
  firstname: string
  lastname: string
  email: string
  phone: string
  birthday: string
  gender: string
  address: {
    id: number
    street: string
    streetName: string
    buildingNumber: string
    city: string
    zipcode: string
    country: string
    country_code: string
    latitude: number
    longitude: number
  }
  website: string
  image: string
}

const sleep = (timeout = 3000) =>
  new Promise((resolve) => setTimeout(resolve, timeout))

export type GetPersonListResponse = ApiResponse<Person[]>

export const getPersonList = async (): Promise<GetPersonListResponse> => {
  await sleep()

  const url = new URL('persons', BASE_API_URL)
  url.searchParams.append('_quantity', '15')

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return response.json()
}
