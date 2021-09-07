export default class JsonServerBase {
  private HOST = 'http://localhost:4300'

  protected async get(path: string) {
    const response = await fetch(`${this.HOST}${path}`);

    return response.json();
  }

  protected async post(path: string, body: any) {
    const response = await fetch(`${this.HOST}${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers:  { 
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }});

    return response.json();
  };

  protected async put(path: string, body: any) {
    const response = await fetch(`${this.HOST}${path}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers:  { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return response.json();
  }

  protected async delete(path: string) {
    const response = await fetch(`${this.HOST}${path}`, {
      method: 'DELETE',
      headers:  { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return response.json();
  }

  public async deleteEntity(id: number) {
    const resource = this.getResourceName();

    if (resource === 'base') throw new Error('This ')

    return await this.delete(`/${resource}/${id}`);
  }

  public getResourceName() {
    return 'base';
  }
}