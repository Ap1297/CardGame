import { User } from './user.model';
import { Contact } from './user.model';
import { AddLink } from './user.model';
import { AddNotification } from './user.model';
describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });
});

describe('Contact', () => {
  it('should create an instance', () => {
    expect(new Contact()).toBeTruthy();
  });
}); 

describe('AddLink', () => {
  it('should create an instance', () => {
    expect(new AddLink()).toBeTruthy();
  });
}); 

describe('AddNotification', () => {
  it('should create an instance', () => {
    expect(new AddNotification()).toBeTruthy();
  });
}); 