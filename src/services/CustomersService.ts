import JsonServerBase from "./JsonServerBase";

export default class CustomersService extends JsonServerBase {
  public getResourceName() {
    return 'customers';
  }

  public async getCustomers() {
    return await this.get('/customers');
  }

  public async getCustomer(id: number) {
    return await this.get(`/customers/${id}?_embed=borrows`);
  }

  public async createCustomer(customer: Customer) {
    return await this.post('/customers', customer);
  }

  public async updateCustomer(id: number, customer: Customer) {
    return await this.put(`/customers/${id}`, customer);
  }
}