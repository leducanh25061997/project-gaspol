import moment from 'moment';
import DropdownPicker from 'app/components/DropdownPicker';

export default function ProvincePicker() {
  const listProvinces = [
    { label: 'Province1', value: 1 },
    { label: 'Province2', value: 2 },
  ];

  return (
    <DropdownPicker data={listProvinces} label="Province" defaultValue={1} />
  );
}
