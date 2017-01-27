export interface Rule {
  id: number;
  name: string;
  criteria: string;
  action: string;
  enabled?: boolean;
}
