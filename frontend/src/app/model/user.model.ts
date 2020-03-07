export class User {
  username: string;
  authorities: [
    {
      authority: string;
    }
  ];
  accountNonExpired: true;
  accountNonLocked: true;
  credentialsNonExpired: true;
  enabled: true;
}
