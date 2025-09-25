import * as fs from 'fs';
import * as path from 'path';

export interface UserTestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

/**
 * Test Data Generator utility for managing test data
 * Uses Faker.js for realistic data generation with dynamic imports
 */
export class TestDataGenerator {
  
  /**
   * Generate random user data using Faker
   */
  static async generateUserData(): Promise<UserTestData> {
    const { faker } = await import('@faker-js/faker');
    
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: '07' + faker.string.numeric(9) // UK mobile format
    };
  }

}
