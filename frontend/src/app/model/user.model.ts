export class User {
  authorities: [
    {
      authority: string;
    }
  ];
  details: {
    remoteAddress: string;
    sessionId: string;
  };
  authenticated: boolean;
  principal: {
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
  };
  name: string;
}
