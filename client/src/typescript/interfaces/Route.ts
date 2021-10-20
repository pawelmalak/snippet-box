export interface Route {
  name: string;
  dest: string;
  requiresAuthentication: boolean;
  hideFromAuthenticated: boolean;
}
