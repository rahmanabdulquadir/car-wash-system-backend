// export type TAddress = {
//   address: string;
//   city: string;
//   postalCode: string;
//   country: string;
// }

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'customer';
  address: string;
}