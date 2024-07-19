import { faker } from '@faker-js/faker';

export function randomString(length: number): string {
  return faker.string.alphanumeric(length);
}

export function checkEmail(email: string): boolean {
  const regex = new RegExp(/\S+@\S+\.\S+/);
  return regex.test(email);
}
