import { SwitchButton } from '../Switch';

interface Props {
  checked: boolean;
  changeStatus: (checked: boolean, id: number) => void;
  kisId: number;
}
export const ToggleStatus = (props: Props) => {
  const { checked, changeStatus, kisId } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    changeStatus(checked, kisId);
  };

  return <SwitchButton handleChange={handleChange} checked={checked} />;
};
