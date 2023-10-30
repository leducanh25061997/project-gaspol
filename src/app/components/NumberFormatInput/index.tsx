import React, { memo } from 'react';
import NumberFormat from 'react-number-format';

interface Props {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: {
    target: { name: string; value: number | undefined };
  }) => void;
  format?: string;
  mask?: string[];
  name: string;
}

const NumberFormatCustom = React.forwardRef((props: Props, ref: any) => {
  const { inputRef, onChange, format, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue,
          },
        });
      }}
      thousandSeparator
      isNumericString
      allowNegative={false}
      format={format}
      mask={props.mask}
    />
  );
});

export default memo(NumberFormatCustom);
