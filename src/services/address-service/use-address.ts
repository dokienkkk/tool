import type {Address} from 'src/database/model';

export function useAddress(): [Address[]] {
  const [list, setList] = React.useState<Address[]>([]);

  return [list];
}
