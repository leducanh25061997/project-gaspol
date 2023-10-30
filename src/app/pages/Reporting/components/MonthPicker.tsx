import moment from 'moment';
import DropdownPicker from 'app/components/DropdownPicker';

export default function MonthPicker() {
  const listMonths = moment.months().map((month, index) => ({
    value: index,
    label: month,
  }));

  return (
    <DropdownPicker
      data={listMonths}
      label="Monthly"
      defaultValue={new Date().getMonth()}
    />
  );
}
